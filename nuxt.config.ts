// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@prisma/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-vue3-google-signin'
  ],
  runtimeConfig: {
    apiSecret: {
      development: {
        database_url: process.env.DATABASE_URL,
        jwt_secret: process.env.JWT_SECRET,
        google_client_id: process.env.GOOGLE_CLIENT_ID,
      }
    }
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})