export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['@/assets/scss/main.scss'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    autoImport: true
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables" as *;
            @use "@/assets/scss/mixins" as *;
            @use "sass:color";
            @use "sass:map";

          `
        }
      }
    }
  }
})
