<template>
  <SearchInput
      placeholder='Find by name'
      v-model="searchQuery"/>
  <Select
      v-model="selected"
      :options="options"/>
  <button @click="searchCharacters">Search</button>
  <div
      v-for="character in characters"
      :key="character.id">
    <CharacterCard
        :id="character.id"
        :name="character.name"
        :status="character.status"
        :episodes="character.episode.slice(0, 5)"
        :link="'/characters/'+character.id" />
  </div>
</template>

<script setup>
import infiniteScroll from "~/utils/infiniteScroll";
import { useCharacterStore } from '@/store/character';

/**
 * Define options for select filter
 */
const options = [
  'Alive',
  'Dead',
  'unknown'
];

/**
 * Create refs for select and search v-models
 */
const searchQuery = ref('');
const selected = ref('');


const store = useCharacterStore();

/**
 * Define characters reactive variable
 */
const characters = computed(() => store.characters);

/**
 * Load characters from store, if it is empty
 */
if (characters.value.length === 0) {
  store.loadCharactersList(searchQuery.value, selected.value);
}

/**
 * Define method for loading characters
 * @param nameFilter - filter for searching by name
 * @param selectedFilter - filter for status
 */
function loadMoreCharacters(nameFilter, selectedFilter) {
  return () => {
    store.loadCharactersList(nameFilter, selectedFilter);
  }
}

/**
 * Define on mounted actions
 */
onMounted(() => {
  /**
   * Init infinite scroll
   */
  infinitescroll(loadMoreCharacters(searchQuery.value, selected.value));
});

/**
 * Callback for searching characters
 */
function searchCharacters() {
  /**
   * Load characters by new filters
   */
  store.loadCharactersList(searchQuery.value, selected.value);

  /**
   * Redefine infinite scroll with new method
   */
  infiniteScroll(loadMoreCharacters(searchQuery.value, selected.value));
}
</script>

<style scoped>

</style>