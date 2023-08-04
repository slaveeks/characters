<template>
<div>
    <input type="text"
           :placeholder="placeholder"
           :value="modelValue"
           @input="updateSearchQuery"/>
  </div>
</template>

<script setup>
/**
 * Define emits for updating model value
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Define properties for search input component
 */
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

/**
 * Define search query from props
 */
let searchQuery = props.value;

/**
 * Update search query, will be called, when value changed
 * @param event - input event
 */
function updateSearchQuery(event) {
  /**
   * Get updated search query from input
   */
  searchQuery = event.target.value;
  emit("update:modelValue", searchQuery);
}

</script>

<style scoped>

</style>