<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--disabled': disabled, 'btn--full-width': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped lang="scss">
.btn {
  @include button-reset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &--small {
    padding: $spacing-xs $spacing-sm;
    font-size: 0.875rem;
  }

  &--medium {
    padding: $spacing-sm $spacing-md;
    font-size: 1rem;
  }

  &--large {
    padding: $spacing-md $spacing-lg;
    font-size: 1.125rem;
  }

  &--primary {
    background-color: $primary;
    color: $white;

    &:hover:not(:disabled) {
      background-color: $primary-dark;
    }
  }

  &--secondary {
    background-color: $accent;
    color: $white;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }

  &--outline {
    background-color: transparent;
    border: 1px solid $primary;
    color: $primary;

    &:hover:not(:disabled) {
      background-color: $primary;
      color: $white;
    }
  }

  &--danger {
    background-color: $error;
    color: $white;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--full-width {
    width: 100%;
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>