<template>
  <select v-model="selected" @change="updateSearchQuery">
    <option v-for="option in props.options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: []
  }
})

let selected = props.value;

function updateSearchQuery(event) {
  selected = event.target.value;
  emit("update:modelValue", selected);
}
</script>

<style scoped>

</style>