export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'toBeModified'),
    sessions: {
      refreshToken: {
        cookie: {
          httpOnly: true,
          secure: true,
          sameSite: 'none', // Changed from 'lax' to 'none' for proxy
        },
      },
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'toBeModified'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'toBeModified'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  url: env('ADMIN_URL', '/admin'),
  vite: {
    server: {
      host: true,
      allowedHosts: ['cms.arkiv.network', 'localhost', '127.0.0.1'],
    },
  },
});
