// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-primevue", "@pinia/nuxt"], pinia: {
    storesDirs: ["./stores/**"],
  }, devtools: { enabled: true }, css: ["@/assets/fonts.css"], components: [{
    path: "~/components", pathPrefix: false,
  }], vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use \"@/assets/_colors.scss\" as *;",
        },
      },

    },
  },
});
