import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Rating from '~/components/ui/Rating.vue'
import Modal from '~/components/ui/Modal.vue'
import BookCard from '~/components/ui/BookCard.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Input', Input)
  nuxtApp.vueApp.component('Rating', Rating)
  nuxtApp.vueApp.component('Modal', Modal)
  nuxtApp.vueApp.component('BookCard', BookCard)
})