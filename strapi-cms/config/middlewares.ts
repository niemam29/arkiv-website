export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      key: 'strapi.sid',
      httpOnly: true,
      secure: false, // Set to false since we're behind a proxy
      signed: true,
      rolling: false,
      renew: false
    }
  },
  'strapi::favicon',
  'strapi::public'
]
