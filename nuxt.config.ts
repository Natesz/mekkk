// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    openaiApiKey: '',
    barionPosKey: process.env.BARION_POS_KEY ?? '',
    barionPayeeEmail: process.env.BARION_PAYEE_EMAIL ?? '',
    barionWebhookUrl: process.env.BARION_WEBHOOK_URL ?? '',
    barionRedirectUrl: process.env.BARION_REDIRECT_URL ?? '',
    barionApiBase: process.env.BARION_API_BASE ?? 'https://api.test.barion.com',
    public: {
      supabaseUrl: '',
      supabaseAnonKey: '',
    },
  },
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  nitro: {
    preset: 'vercel',
  },
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