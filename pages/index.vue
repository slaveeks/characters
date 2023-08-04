<template>
  <SearchInput placeholder='Find by name' v-model="searchQuery"/>
  <Select v-model="selected" :options="options"/>
  <button @click="searchCharacters">Search</button>
  <div v-for="character in characters" :key="character.id">
    <CharacterCard :id="character.id" :name="character.name" :status="character.status" :episodes="character.episode.slice(0, 5)" />
  </div>
</template>

<script setup>
import infinitescroll from "~/utils/infinitescroll";

const options = [
  'Alive',
  'Dead',
  'unknown'
];

const searchQuery = ref('');
const selected = ref('');

import { useCharacterStore } from '@/store/character';
import SearchInput from "~/components/SearchInput.vue";
const store = useCharacterStore();

const characters = computed(() => store.characters);

if (characters.value.length === 0) {
  store.loadCharactersList(searchQuery.value, selected.value);
}

function loadMoreCharacters(value, selectedValue) {
  return () => {
    store.loadCharactersList(value, selectedValue);
  }
}

onMounted(() => {
  infinitescroll(loadMoreCharacters(searchQuery.value, selected.value));
});
function searchCharacters() {
  console.log(characters);
  console.log();
  store.loadCharactersList(searchQuery.value, selected.value);
  infinitescroll(loadMoreCharacters(searchQuery.value, selected.value));
}
</script>

<style scoped>

</style>