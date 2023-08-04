<template>
  <div class="card">
    <NuxtLink :to="link">
      {{ name }}
    </NuxtLink>
    <div>
    {{ species }}
    </div>
    <div>
    {{ status }}
    </div>
    <div>
    {{ episodes }}
    </div>
  </div>
</template>

<script setup>
/**
 * Define character card component properties
 */
defineProps({
  name: String,
  species: String,
  status: String,
  episodes: {
    type: Array,
  },
  link: String
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
}
</style>