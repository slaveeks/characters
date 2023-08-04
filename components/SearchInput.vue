<template>
<div class="search-input">
    <input type="text" :placeholder="placeholder" :value="modelValue"
           @input="updateSearchQuery"/>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

let searchQuery = props.value;

function updateSearchQuery(event) {
  searchQuery = event.target.value;
  console.log(searchQuery);
  emit("update:modelValue", searchQuery);
}

</script>

<style scoped>

</style>