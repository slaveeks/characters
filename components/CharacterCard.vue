<template>
  <div class="card">
    <div>
      {{ name }}
    </div>
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
const props = defineProps({
  name: String,
  species: String,
  status: String,
  episodes: {
    type: Array,
  },
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