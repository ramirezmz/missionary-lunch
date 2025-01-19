// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@prisma/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt'
  ],
  runtimeConfig: {
    apiSecret: {
      development: {
        database_url: process.env.DATABASE_URL,
        jwt_secret: process.env.JWT_SECRET,
      }
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})