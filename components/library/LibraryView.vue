<template>
  <div class="library-view">
    <div class="library-view__header">
      <h2>Mi Biblioteca</h2>
      <LibraryFilters @filter="handleFilter" />
    </div>

    <div v-if="loading" class="library-view__loading">
      <p>Cargando biblioteca...</p>
    </div>

    <div v-else-if="error" class="library-view__error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="books.length === 0" class="library-view__empty">
      <p>No tienes libros en tu biblioteca</p>
      <NuxtLink to="/">
        <Button>Buscar libros</Button>
      </NuxtLink>
    </div>

    <div v-else class="library-view__grid">
      <LibraryItem
        v-for="book in books"
        :key="book._id"
        :book="book"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <Modal
      v-model:show="showEditModal"
      :title="editingBook ? `Editar ${editingBook.title}` : 'Editar libro'"
    >
      <template #content>
        <BookDetail
          :book="editingBook"
          mode="edit"
          @save="handleSaveEdit"
          @cancel="showEditModal = false"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useBooksStore } from '~/stores/books'
  import BookDetail from '../book/BookDetail.vue'
  import LibraryItem from './LibraryItem.vue'
  import Modal from '../ui/Modal.vue'
import LibraryFilters from './LibraryFilters.vue'

  const booksStore = useBooksStore()
  const showEditModal = ref(false)
  const editingBook = ref(null)

  const books = computed(() => booksStore.library)
  const loading = computed(() => booksStore.loading)
  const error = computed(() => booksStore.error)

  onMounted(() => {
    booksStore.fetchLibrary()
  })

  const handleFilter = async (filters) => {
   try {
    await booksStore.fetchLibrary(filters)
   } catch (error) {
    console.log(error)
   } 
  }

  const handleEdit = book => {
    editingBook.value = book
    showEditModal.value = true
  }

  const handleDelete = async bookId => {
    if (confirm('¿Estás seguro de que quieres eliminar este libro de tu biblioteca?')) {
      await booksStore.deleteBook(bookId)
    }
  }

  const handleSaveEdit = async bookData => {
    try {
      await booksStore.updateBook(editingBook.value._id, bookData)

      editingBook.value = null
      showEditModal.value = false
    } catch (error) {
      console.error('Error updating book:', error)
    }
  }
</script>

<style scoped lang="scss">
  .library-view {
    &__header {
      @include flex-between;
      margin-bottom: $spacing-xl;
      flex-wrap: wrap;
      gap: $spacing-md;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: $spacing-lg;
    }

    &__loading,
    &__error,
    &__empty {
      text-align: center;
      padding: $spacing-xl;
    }

    &__error {
      color: $error;
    }

    &__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-md;
    }
  }

  @media (max-width: $breakpoint-md) {
    .library-view__header {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
