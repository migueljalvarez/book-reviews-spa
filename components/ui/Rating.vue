<template>
  <div class="rating">
    <button
      v-for="star in 5"
      :key="star"
      :class="['rating-star', { 'rating-star--active': star <= modelValue }]"
      @click="setRating(star)"
      @mouseover="hoverRating = star"
      @mouseleave="hoverRating = 0"
    >
      <span class="rating-star-icon">★</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 5
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const hoverRating = ref(0)

const setRating = (rating) => {
  if (!props.disabled) {
    emit('update:modelValue', rating)
  }
}
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  gap: $spacing-xs;
}

.rating-star {
  @include button-reset;
  font-size: 0;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.2);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &--active {
    .rating-star-icon {
      color: #ffc107;
    }
  }
}

.rating-star-icon {
  font-size: 2rem;
  color: #e0e0e0;
  transition: color 0.2s ease;
}
</style>