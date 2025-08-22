<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal">
        <div class="modal-header">
          <h2 v-if="title" class="modal-title">{{ title }}</h2>
          <button class="modal-close" @click="close">×</button>
        </div>
        <div class="modal-content">
          <slot name="content"></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:show'])

const close = () => {
  emit('update:show', false)
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: $spacing-md;
}

.modal {
  background: $white;
  border-radius: $border-radius;
  box-shadow: $shadow-lg;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-lg;
  border-bottom: 1px solid $divider;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  @include button-reset;
  font-size: 1.5rem;
  line-height: 1;
  color: $text-secondary;
  
  &:hover {
    color: $text-primary;
  }
}

.modal-content {
  padding: $spacing-lg;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  padding: $spacing-lg;
  border-top: 1px solid $divider;
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
}

// Transiciones
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.9);
  opacity: 0;
}
</style>