<template>
  <div class="search-form">
    <form @submit.prevent="handleSubmit" class="search-form__container">
      <Input
        v-model="query"
        placeholder="Escribe el nombre de un Libro para continuar"
        :disabled="booksStore.loading"
        class="search-form__input"
        @input="handleInput"
      />
      <Button type="submit" :loading="booksStore.loading" class="search-form__button">Buscar</Button>
    </form>

    <div v-if="searchHistory.length > 0" class="search-history">
      <h3 class="search-history__title">Búsquedas recientes</h3>
      <div class="search-history__items">
        <button
          v-for="(term, index) in searchHistory"
          :key="index"
          class="search-history__item"
          @click="selectHistoryTerm(term)"
        >
          {{ term }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useBooksStore } from '~/stores/books'

  const booksStore = useBooksStore()
  const query = ref('')
  const searchHistory = ref([])

  const emit = defineEmits(['search'])

  onMounted(async () => {
    await booksStore.getLastSearches()
    searchHistory.value = booksStore.searchHistory
  })

  const handleSubmit = () => {
    if (query.value.trim()) {
      emit('search', query.value.trim())
    }
  }

  const handleInput = () => {
    // Limpiar espacios múltiples
    query.value = query.value.replace(/\s+/g, ' ')
  }

  const selectHistoryTerm = term => {
    query.value = term
    handleSubmit()
  }
</script>

<style scoped lang="scss">
  .search-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .search-form__container {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
  }

  .search-form__input {
    flex-grow: 1;
  }

  .search-history__title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: $spacing-sm;
    color: $text-secondary;
  }

  .search-history__items {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  .search-history__item {
    @include button-reset;
    padding: $spacing-xs $spacing-sm;
    background-color: $primary-light;
    color: $primary;
    border-radius: $border-radius;
    font-size: 0.875rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: shade($primary-light, 10%);
    }
  }

  @media (max-width: $breakpoint-sm) {
    .search-form__container {
      flex-direction: column;
    }
  }
</style>
