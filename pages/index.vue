<template>
  <div>
    <Header />
    <main class="page">
      <div class="container">
        <div v-if="!selectedBook" class="search-view">
          <SearchForm @search="handleSearch" />
          <SearchResults
            :results="searchResults"
            :loading="loading"
            :error="error"
            :query="searchQuery"
            @select-book="selectBook"
          />
        </div>

        <div v-else class="detail-view">
          <Button variant="outline" class="detail-view__back" @click="selectedBook = null">
            ← Volver a resultados
          </Button>
          <BookDetail
            :book="selectedBook"
            mode="create"
            @save="saveBook"
            @cancel="selectedBook = null"
          />
        </div>

        <Modal title="Libro guardado" v-model:show="showSuccessModal">
          <p>El libro se ha guardado correctamente en tu biblioteca.</p>
          <template #footer>
            <Button @click="showSuccessModal = false">Aceptar</Button>
            <NuxtLink to="/library">
              <Button variant="primary">Ir a mi biblioteca</Button>
            </NuxtLink>
          </template>
        </Modal>

        <Modal title="Error" v-model:show="showErrorModal">
          <p>{{ errorMessage }}</p>
          <template #footer>
            <Button @click="showErrorModal = false">Cerrar</Button>
          </template>
        </Modal>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Modal from '~/components/ui/Modal.vue'
  import { useBooksStore } from '~/stores/books'

  const booksStore = useBooksStore()
  const selectedBook = ref(null)
  const searchQuery = ref('')
  const showSuccessModal = ref(false)

  const searchResults = computed(() => booksStore.searchResults)
  const loading = computed(() => booksStore.loading)
  const error = computed(() => booksStore.error)
  const showErrorModal = ref(false)
  const errorMessage = ref('')

  const handleSearch = async query => {
    searchQuery.value = query
    await booksStore.searchBooks(query)
  }

  const selectBook = book => {
    selectedBook.value = book
  }

  const saveBook = async bookData => {
    try {
      await booksStore.saveBook(bookData)

      showSuccessModal.value = true
      selectedBook.value = null
    } catch (error) {
      console.error('Error saving book:', error)
      errorMessage.value = 'Ocurrió un error al guardar el libro'
      showErrorModal.value = true
    }
  }
</script>

<style scoped lang="scss">
  .detail-view {
    &__back {
      margin-bottom: $spacing-lg;
    }
  }
</style>
