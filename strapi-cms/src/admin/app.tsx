import { GoogleLoginButton } from './extensions/components/GoogleLoginButton'

export default {
  config: {
    auth: {
      logo: null
    },
    head: {
      favicon: '/favicon.ico'
    },
    locales: ['en'],
    translations: {
      en: {
        'Auth.form.button.login.providers.google': 'Sign in with Google'
      }
    },
    theme: {
      light: {},
      dark: {}
    },
    tutorials: false,
    notifications: { releases: false }
  },
  bootstrap(app: any) {
    // Inject Google login button into auth page
    const AuthPage = app.getPlugin('users-permissions')?.admin?.pages?.AuthPage
    if (AuthPage) {
      app.registerPlugin({
        id: 'custom-auth',
        name: 'Custom Auth',
        injectionZones: {
          admin: {
            auth: {
              login: {
                after: [
                  {
                    name: 'google-login-button',
                    Component: GoogleLoginButton
                  }
                ]
              }
            }
          }
        }
      })
    }
  }
}
