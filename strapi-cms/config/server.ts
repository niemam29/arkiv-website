export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://cms.arkiv.network'),
  proxy: true, // Trust proxy headers from Traefik
  app: {
    keys: env.array('APP_KEYS', ['toBeModified1', 'toBeModified2'])
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false)
  }
})
