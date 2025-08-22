import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    searchHistory: [],
    searchResults: [],
    currentBook: null,
    library: [],
    loading: false,
    error: null
  }),

  actions: {
    async searchBooks(query) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/books/search?q=${encodeURIComponent(query)}`)
        this.searchResults = response
        this.addToSearchHistory(query)
      } catch (error) {
        this.error = error.data?.message || 'Error al buscar libros'
        console.error('Error searching books:', error)
      } finally {
        this.loading = false
      }
    },

    addToSearchHistory(query) {
      // Evitar duplicados
      this.searchHistory = this.searchHistory.filter(item => item !== query)
      // Agregar al inicio
      this.searchHistory.unshift(query)
      // Mantener solo los últimos 5
      this.searchHistory = this.searchHistory.slice(0, 5)
    },

    async getBookDetails(bookId) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/books/my-library/${bookId}`)
        this.currentBook = response
      } catch (error) {
        this.error = error.data?.message || 'Error al cargar detalles del libro'
        console.error('Error fetching book details:', error)
      } finally {
        this.loading = false
      }
    },

    async saveBook(bookData) {
      this.loading = true
      this.error = null

      const response = await $fetch('/api/books/my-library', {
          method: 'POST',
          body: bookData
        })
        if (response.error) {
          throw new Error(response.message)
      }
      this.loading = false
      return response
    },

    async updateBook(bookId, bookData) {
      this.loading = true
      this.error = null
      
       const response = await $fetch(`/api/books/my-library/${bookId}`, {
          method: 'PUT',
          body: bookData
       })
      this.loading = false
      return response
    },

    async deleteBook(bookId) {
      this.loading = true
      this.error = null
      
      try {
        await $fetch(`/api/books/my-library/${bookId}`, {
          method: 'DELETE'
        })
        
        // Actualizar la librería local
        await this.fetchLibrary()
      } catch (error) {
        this.error = error.data?.message || 'Error al eliminar el libro'
        console.error('Error deleting book:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchLibrary(filters = {}) {
      this.loading = true
      this.error = null
      const query = new URLSearchParams(filters).toString()
      const response = await $fetch(`/api/books/my-library?${query}`)
      
       if (response.error) {
          throw new Error(response.message)
      }
      this.loading = false
        this.library = response
      
    },

    async getLastSearches() {
      try {
        const response = await $fetch('/api/books/last-search/')
        this.searchHistory = response
      } catch (error) {
        console.error('Error fetching last searches:', error)
      }
    }
  }
  
})