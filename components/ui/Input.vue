<template>
  <div :class="['input-container', { 'input-container--error': error }]">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      v-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input-field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <textarea
      v-else
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="input-field input-field--textarea"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <div v-if="error" class="input-error">{{ error }}</div>
    <div v-if="maxLength" class="input-counter">
      {{ modelValue?.length || 0 }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'textarea', 'number'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: null
  },
  rows: {
    type: Number,
    default: 4
  }
})

defineEmits(['update:modelValue'])

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<style scoped lang="scss">
.input-container {
  margin-bottom: $spacing-md;
  position: relative;

  &--error {
    .input-field {
      border-color: $error;
    }
  }
}

.input-label {
  display: block;
  margin-bottom: $spacing-xs;
  font-weight: 500;
  color: $text-primary;
}

.input-field {
  width: 100%;
  padding: $spacing-sm;
  border: 1px solid $divider;
  border-radius: $border-radius-sm;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: $primary;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  &--textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.input-error {
  color: $error;
  font-size: 0.875rem;
  margin-top: $spacing-xs;
}

.input-counter {
  text-align: right;
  font-size: 0.75rem;
  color: $text-secondary;
  margin-top: $spacing-xs;
}
</style>