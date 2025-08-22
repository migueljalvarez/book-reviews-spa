<template>
  <div class="book-detail">
    <div class="book-detail__header">
      <h2>{{ book.title }}</h2>
      <p v-if="book.author" class="book-detail__author">{{ book.author }}</p>
      <p v-if="book.publishedYear" class="book-detail__year">{{ book.publishedYear }}</p>
    </div>

    <div class="book-detail__content">
      <div class="book-detail__cover">
        <img
          :src="'data:image/jpeg;base64,' + book.coverBase64"
          :alt="`Portada de ${book.title}`"
          class="book-detail__image"
        />
      </div>

      <div class="book-detail__form">
        <div class="book-detail__rating">
          <label>Calificación:</label>
          <Rating v-model="rating" :disabled="mode === 'view'" />
        </div>

        <Input
          v-model="review"
          type="textarea"
          label="Reseña:"
          placeholder="Escribe tu reseña aquí (máximo 500 caracteres)"
          :max-length="500"
          :disabled="mode === 'view'"
          class="book-detail__review"
        />

        <div v-if="mode !== 'view'" class="book-detail__actions">
          <Button @click="handleSave" :loading="loading">Guardar</Button>
          <Button variant="outline" @click="$emit('cancel')">Cancelar</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useBooksStore } from '~/stores/books'

  const booksStore = useBooksStore()
  const rating = ref(0)
  const review = ref('')
  const loading = ref(false)

  const props = defineProps({
    book: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'create',
      validator: value => ['create', 'edit', 'view'].includes(value)
    }
  })

  const emit = defineEmits(['save', 'cancel'])

  watch(
    () => props.book,
    newBook => {
      rating.value = newBook.rating || 0
      review.value = newBook.review || ''
    },
    { immediate: true }
  )

  const handleSave = async () => {
    loading.value = true
    try {
      const bookData = {
        title: props.book.title,
        author: props.book.author,
        year: props.book.year,
        coverBase64: props.book.coverBase64,
        rating: rating.value,
        review: review.value
      }

      emit('save', bookData)
    } catch (error) {
      console.error('Error saving book:', error)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped lang="scss">
  .book-detail {
    &__header {
      margin-bottom: $spacing-lg;
      text-align: center;
    }

    &__author {
      color: $text-secondary;
      font-size: 1.125rem;
      margin-bottom: $spacing-xs;
    }

    &__year {
      color: $text-secondary;
    }

    &__content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: $spacing-xl;
      align-items: start;
    }

    &__cover {
      text-align: center;
    }

    &__image {
      max-width: 100%;
      max-height: 400px;
      border-radius: $border-radius;
      box-shadow: $shadow-md;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
    }

    &__rating {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;

      label {
        font-weight: 500;
      }
    }

    &__actions {
      display: flex;
      gap: $spacing-md;
    }
  }

  @media (max-width: $breakpoint-md) {
    .book-detail__content {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }

    .book-detail__cover {
      order: 1;
    }

    .book-detail__form {
      order: 2;
    }
  }
</style>
