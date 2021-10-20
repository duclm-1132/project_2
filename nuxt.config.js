export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'manage_employee',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "vue-toastification/nuxt",
    'cookie-universal-nuxt',
    '@nuxtjs/i18n',
  ],

  // i18n module configuration: https://i18n.nuxtjs.org/options-reference
  i18n: {
    lazy: true,
    langDir: '~/locales/',
    locales: [
      { code: 'vi', iso: 'vi-VN', file: 'vn.js', name: 'Tiếng Việt' },
      { code: 'en', iso: 'en-US', file: 'en.js', name: 'English' },
    ],
    // strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale: 'vi',
    vueI18n: {
      fallbackLocale: ['en', 'vi'],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
