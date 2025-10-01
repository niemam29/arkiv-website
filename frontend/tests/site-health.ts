const DEFAULT_BASE_URL = process.argv[2] ?? 'https://arkiv.network'

const MAX_DEPTH = Number(process.env.MAX_DEPTH ?? '10')
const base = new URL(DEFAULT_BASE_URL)
const canonicalHost = base.host
const canonicalOrigin = `${base.protocol}//${canonicalHost}`

const allowedHosts = new Set<string>([base.host, base.hostname])

if (!base.hostname.startsWith('www.')) {
  allowedHosts.add(`www.${base.hostname}`)
}

interface QueueEntry {
  url: string
  key: string
  depth: number
  source: string
}

interface ErrorEntry {
  url: string
  status?: number
  message: string
  source: string
}

const visited = new Set<string>()
const queue: QueueEntry[] = []
const errors: ErrorEntry[] = []

function stripTrailingSlash(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

function normalise(rawUrl: string, source: string, depth: number): QueueEntry | null {
  let target: URL

  try {
    target = new URL(rawUrl, canonicalOrigin)
  } catch (error) {
    return null
  }

  if (!['http:', 'https:'].includes(target.protocol)) {
    return null
  }

  if (!allowedHosts.has(target.host)) {
    return null
  }

  const fetchUrl = target.toString()

  const keyUrl = new URL(fetchUrl)
  keyUrl.hash = ''
  keyUrl.host = canonicalHost
  keyUrl.protocol = base.protocol
  keyUrl.pathname = stripTrailingSlash(keyUrl.pathname)

  return {
    url: fetchUrl,
    key: keyUrl.toString(),
    depth,
    source,
  }
}

function enqueue(rawUrl: string, source: string, depth: number) {
  const entry = normalise(rawUrl, source, depth)
  if (!entry) return
  if (visited.has(entry.key) || queue.some((item) => item.key === entry.key)) {
    return
  }
  queue.push(entry)
}

function extractLinks(html: string): string[] {
  const links = new Set<string>()

  const hrefRegex = /<a\s+[^>]*href\s*=\s*"([^"]+)"/gi
  let hrefMatch: RegExpExecArray | null
  while ((hrefMatch = hrefRegex.exec(html)) !== null) {
    links.add(hrefMatch[1])
  }

  const hrefSingleRegex = /<a\s+[^>]*href\s*=\s*'([^']+)'/gi
  while ((hrefMatch = hrefSingleRegex.exec(html)) !== null) {
    links.add(hrefMatch[1])
  }

  return Array.from(links)
}

async function hydrateQueueFromSitemap() {
  const sitemapUrl = new URL('/sitemap.xml', canonicalOrigin).toString()

  try {
    const response = await fetch(sitemapUrl)
    if (!response.ok) {
      console.warn(`⚠️  Unable to load sitemap (${response.status})`)
      return
    }

    const body = await response.text()
    const locRegex = /<loc>([^<]+)<\/loc>/gi
    let match: RegExpExecArray | null

    while ((match = locRegex.exec(body)) !== null) {
      const loc = match[1]
      try {
        const url = new URL(loc)
        enqueue(url.pathname + url.search, 'sitemap', 1)
      } catch (error) {
        // ignore malformed URLs
      }
    }
  } catch (error) {
    console.warn(`⚠️  Failed to fetch sitemap: ${(error as Error).message}`)
  }
}

enqueue(base.toString(), 'seed', 0)

const routeRecords: { url: string; status: number; redirectedTo?: string }[] = []

function looksLikePage(pathname: string) {
  return !pathname.match(/\.(png|jpe?g|svg|webp|ico|css|js|json|xml|woff2?|ttf|mp4|pdf)$/i)
}

async function main() {
  await hydrateQueueFromSitemap()

  while (queue.length > 0) {
    const current = queue.shift()!

    if (visited.has(current.key)) {
      continue
    }

    if (current.depth > MAX_DEPTH) {
      continue
    }

    visited.add(current.key)

    let response: Response

    try {
      response = await fetch(current.url, { redirect: 'follow' })
    } catch (error) {
      errors.push({
        url: current.url,
        message: `Network error: ${(error as Error).message}`,
        source: current.source,
      })
      console.error(`✖ ${current.url} — ${(error as Error).message}`)
      continue
    }

    const { status } = response
    const finalUrl = response.url

    routeRecords.push({
      url: current.url,
      status,
      redirectedTo: finalUrl !== current.url ? finalUrl : undefined,
    })

    if (status >= 400) {
      errors.push({
        url: current.url,
        status,
        message: `HTTP ${status}`,
        source: current.source,
      })
      console.error(`✖ ${status} ${current.url}`)
      continue
    }

    console.log(`✓ ${status} ${current.url}`)

    const contentType = response.headers.get('content-type') ?? ''

    if (!contentType.includes('text/html')) {
      continue
    }

    const html = await response.text()
    const links = extractLinks(html)

    for (const link of links) {
      if (!link || link.startsWith('#')) continue
      if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('javascript:')) {
        continue
      }

      try {
        const url = new URL(link, current.url)
        if (!allowedHosts.has(url.host)) {
          continue
        }

        if (looksLikePage(url.pathname)) {
          enqueue(url.toString(), current.url, current.depth + 1)
        }
      } catch (error) {
        continue
      }
    }
  }

  if (errors.length > 0) {
    console.error('\nEncountered issues:')
    for (const issue of errors) {
      const statusInfo = issue.status ? ` (status ${issue.status})` : ''
      console.error(` - ${issue.url}${statusInfo} — ${issue.message} [from ${issue.source}]`)
    }
    process.exitCode = 1
  } else {
    console.log('\nAll checked routes responded without 4xx/5xx errors.')
  }

  console.log(`\nVisited ${visited.size} routes.`)
}

main().catch(console.error)

export {}
