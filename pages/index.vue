<template>
  <div v-for="character in getCharacters" :key="character.id">
    <CharacterCard :id="character.id" :name="character.name" :species="character.species" :episodes="character.episode.slice(0, 5)" />
  </div>
</template>

<script setup>
import infinitescroll from "~/utils/infinitescroll";

let page = 1;
import { useCharacterStore } from '@/store/character';
const { getCharacters, loadCharactersList } = useCharacterStore();

if (getCharacters.length === 0) {
  loadCharactersList();
}

onMounted(() => {
  infinitescroll(loadCharactersList);
});
</script>

<style scoped>

</style>