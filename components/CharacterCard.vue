<template>
  <div>
    <div>
      {{ name }}
    </div>
    <div>
    {{ species }}
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
  episodes: {
    type: Array,
  }
})
</script>

<style scoped>

</style>