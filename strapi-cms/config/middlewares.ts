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
      secure: true,
      signed: true,
      rolling: false,
      renew: false,
      sameSite: 'lax', // Back to 'lax' - 'none' might not work with our setup
    },
  },
  'strapi::favicon',
  'strapi::public',
];
