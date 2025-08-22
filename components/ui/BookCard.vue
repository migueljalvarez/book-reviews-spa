<template>
  <article :class="['book-card', { 'book-card--clickable': clickable }]" @click="$emit('click')">
    <div class="book-card__image-container">
      <img
        :src="'data:image/jpeg;base64,' + book.coverBase64"
        :alt="`Portada de ${book.title}`"
        class="book-card__image"
      />
    </div>
    <div class="book-card__content">
      <h3 class="book-card__title">{{ book.title }}</h3>
      <p v-if="book.author" class="book-card__author">{{ book.author }}</p>
      <p v-if="book.publishedYear" class="book-card__year">{{ book.publishedYear }}</p>
      <div v-if="showRating && book.rating" class="book-card__rating">
        <Rating :model-value="book.rating" disabled />
      </div>
      <slot name="actions"></slot>
    </div>
  </article>
</template>

<script setup>
  import Rating from './Rating.vue'

  defineProps({
    book: {
      type: Object,
      required: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    showRating: {
      type: Boolean,
      default: false
    }
  })

  defineEmits(['click'])
</script>

<style scoped lang="scss">
  .book-card {
    @include card;
    display: flex;
    flex-direction: column;
    height: 100%;

    &--clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
      }
    }

    &__image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
      border-radius: $border-radius-sm;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover &__image {
      transform: scale(1.05);
    }

    &__content {
      padding: $spacing-md 0 0;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: $spacing-xs;
      @include multi-line-truncate(2);
    }

    &__author {
      color: $text-secondary;
      margin-bottom: $spacing-xs;
      @include truncate;
    }

    &__year {
      color: $text-secondary;
      font-size: 0.875rem;
      margin-bottom: $spacing-md;
    }

    &__rating {
      margin-top: auto;
    }
  }
</style>
