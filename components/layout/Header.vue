<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <NuxtLink to="/" class="header__logo">
          <h1>Book Reviews</h1>
        </NuxtLink>
        <nav class="header__nav">
          <NuxtLink to="/library" class="header__link">
            <Button variant="outline" size="small">Mi Biblioteca</Button>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import Button from '../ui/Button.vue'
</script>

<style scoped lang="scss">
.header {
  background-color: $white;
  box-shadow: $shadow-sm;
  padding: $spacing-md 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__content {
  @include flex-between;
}

.header__logo {
  text-decoration: none;
  color: $primary;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
}

.header__nav {
  display: flex;
  gap: $spacing-md;
}
</style>