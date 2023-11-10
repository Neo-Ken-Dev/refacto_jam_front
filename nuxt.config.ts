// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
  imports: {
    dirs: ['stores', 'types'],
    presets: [
      'vue',
    ]
  },
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    baseURL: process.env.API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/auth', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: 'api/user' }
      },
      pages: {
        login: '/connexion'
      },
    },
    globalAppMiddleware: true
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      },
      theme: {
        defaultTheme: 'jamTheme',
        themes: {
          jamTheme: {
            dark: false,
            colors: {
              primary: '#D3AC07',
              secondary: '#02324F',
              accent: '#ED6A5B',
              warning: '#FC9674',
              info: '#D8E0E5',
              error: '#8A0327',
              success: '#36827F'
            }
          }
        }
      }
    },
    moduleOptions: {
    }
  },
  devtools: { enabled: true },
})
