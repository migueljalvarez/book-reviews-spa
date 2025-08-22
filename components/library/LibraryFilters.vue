<template>
  <div class="library-filters">
    <Input
      v-model="filters.title"
      placeholder="Buscar por título "
      class="library-filters__search"
      @input="debouncedApplyFilters"
    />
    <Input
      v-model="filters.author"
      placeholder="Buscar por autor "
      class="library-filters__search"
      @input="debouncedApplyFilters"
    />
    <div class="library-filters__controls">
      <select v-model="filters.sortOrder" class="library-filters__select" @change="applyFilters">
        <option value="">Ordenar por</option>
        <option value="rating_asc">Calificación: Menor a Mayor</option>
        <option value="rating_desc">Calificación: Mayor a Menor</option>
      </select>

      <label class="library-filters__checkbox">
        <input type="checkbox" v-model="filters.hasReview" @change="applyFilters" />
        <span>Excluir sin reseña</span>
      </label>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { debounce } from 'lodash-es'

  const filters = ref({
    title: '',
    author: '',
    hasReview: false,
    sortOrder: 'asc'
  })

  const emit = defineEmits(['filter'])

  const debouncedApplyFilters = debounce(() => {
    emit('filter', { ...filters.value, hasReview: !filters.value.hasReview })
  }, 300)

  const applyFilters = () => {
    emit('filter', { ...filters.value, hasReview: !filters.value.hasReview })
  }

  watch(
    filters,
    () => {
      debouncedApplyFilters()
    },
    { deep: true }
  )
</script>

<style scoped lang="scss">
  .library-filters {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    align-items: center;
  }

  .library-filters__search {
    min-width: 250px;
  }

  .library-filters__controls {
    display: flex;
    gap: $spacing-md;
    align-items: center;
  }

  .library-filters__select {
    padding: $spacing-sm;
    border: 1px solid $divider;
    border-radius: $border-radius-sm;
    background-color: $white;
  }

  .library-filters__checkbox {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    cursor: pointer;

    input {
      margin: 0;
    }
  }

  @media (max-width: $breakpoint-sm) {
    .library-filters {
      flex-direction: column;
      align-items: stretch;
    }

    .library-filters__search {
      min-width: auto;
    }

    .library-filters__controls {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
