// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    openaiApiKey: '',
    public: {
      supabaseUrl: '',
      supabaseAnonKey: '',
    },
  },
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  app: {
    head: {
      title: 'MEKKK',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MEKKK – Kézműves kecskesajt platform' },
      ],
    },
  },
})