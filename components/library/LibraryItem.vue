<template>
  <div class="library-item">
    <BookCard :book="book" show-rating>
      <template #actions>
        <div class="library-item__actions">
          <Button size="small" @click="$emit('edit', book)">Editar</Button>
          <Button variant="danger" size="small" @click="$emit('delete', book._id)">Eliminar</Button>
        </div>
      </template>
    </BookCard>
    
    <div v-if="book.review" class="library-item__review">
      <h4>Reseña:</h4>
      <p>{{ book.review }}</p>
    </div>
  </div>
</template>

<script setup>
import BookCard from '../ui/BookCard.vue'
import Button from '../ui/Button.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<style scoped lang="scss">
.library-item {
  @include card;
  
  &__actions {
    display: flex;
    gap: $spacing-sm;
    margin-top: $spacing-md;
  }
  
  &__review {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $divider;
    
    h4 {
      margin-bottom: $spacing-xs;
      font-size: 0.875rem;
      color: $text-secondary;
    }
    
    p {
      line-height: 1.5;
    }
  }
}
</style>