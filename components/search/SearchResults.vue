<template>
  <div class="search-results">
    <div v-if="loading" class="search-results__loading">
      <p>Buscando libros...</p>
    </div>
    
    <div v-else-if="error" class="search-results__error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="results.length === 0 && query" class="search-results__empty">
      <p>No encontramos libros con el título ingresado</p>
    </div>
    
    <div v-else-if="results.length > 0" class="search-results__grid">
      <BookCard
        v-for="book in results"
        :key="book.id"
        :book="book"
        clickable
        @click="$emit('select-book', book)"
      />
    </div>
  </div>
</template>

<script setup>
import BookCard from '../ui/BookCard.vue'

defineProps({
  results: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  query: {
    type: String,
    default: ''
  }
})

defineEmits(['select-book'])
</script>

<style scoped lang="scss">
.search-results {
  margin-top: $spacing-xl;
}

.search-results__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: $spacing-lg;
}

.search-results__loading,
.search-results__error,
.search-results__empty {
  text-align: center;
  padding: $spacing-xl;
  color: $text-secondary;
}

.search-results__error {
  color: $error;
}
</style>