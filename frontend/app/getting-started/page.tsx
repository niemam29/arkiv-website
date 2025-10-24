'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GettingStartedPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/getting-started/typescript')
  }, [router])

  return null
}
