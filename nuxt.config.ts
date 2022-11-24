// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],

  app: {
    head: {
      title: 'Text to image',
      meta: [
        { name: 'description', content: 'Input text and receive an image in return!' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg', href: '/BISS-favicon.svg' }
      ]
    }
  },

  runtimeConfig: {
    apiKey: '',
  },
})
