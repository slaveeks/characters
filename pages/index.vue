<template>
  <SearchInput placeholder='Find by name' v-model="searchQuery"/>
  <button @click="searchCharacters">Search</button>
  <div v-for="character in characters" :key="character.id">
    <CharacterCard :id="character.id" :name="character.name" :episodes="character.episode.slice(0, 5)" />
  </div>
</template>

<script setup>
import infinitescroll, {remove} from "~/utils/infinitescroll";

const searchQuery = ref('');

import { useCharacterStore } from '@/store/character';
import SearchInput from "~/components/SearchInput.vue";
const store = useCharacterStore();

const characters = computed(() => store.characters);

if (characters.value.length === 0) {
  store.loadCharactersList(searchQuery.value);
}

function loadMoreCharacters(value) {
  return () => {
    store.loadCharactersList(value);
  }
}

onMounted(() => {
  infinitescroll(loadMoreCharacters(searchQuery.value));
});
function searchCharacters() {
  console.log(characters);
  console.log();
  remove();
  store.loadCharactersList(searchQuery.value);
  infinitescroll(loadMoreCharacters(searchQuery.value));
}
</script>

<style scoped>

</style>