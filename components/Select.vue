<template>
  <select
      v-model="selected"
      @change="updateSelected">
    <option
        v-for="option in props.options"
        :key="option"
        :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
/**
 * Define emits for updating model value
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Define properties for select component
 */
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

/**
 * Define selected item from props
 */
let selected = props.value;

/**
 * Will be called, when selected item changed
 * @param event - select event
 */
function updateSelected(event) {
  /**
   * Get selected data
   */
  selected = event.target.value;
  emit("update:modelValue", selected);
}
</script>

<style scoped>

</style>