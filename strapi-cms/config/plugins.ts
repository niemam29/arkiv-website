export default ({ env }) => ({
  'users-permissions': {
    config: {
      providers: {
        google: {
          enabled: true,
          icon: 'google',
          key: env('GOOGLE_CLIENT_ID'),
          secret: env('GOOGLE_CLIENT_SECRET'),
          callback: `${env('PUBLIC_URL', 'https://cms.arkiv.network')}/api/auth/google/callback`,
          scope: ['email', 'profile'],
          // Restrict to @golem.network domain only
          authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
          custom_params: {
            hd: 'golem.network', // Google Workspace domain restriction
          },
        },
      },
      // Email domain validation
      register: {
        allowedFields: ['username', 'email'],
      },
    },
  },
});
