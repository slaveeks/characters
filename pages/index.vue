<template>
  <div v-for="character in characters" :key="character.id">
    <CharacterCard :id="character.id" :name="character.name" :species="character.species" :episodes="character.episodes" />
  </div>
</template>

<script setup>
import { useCharacterStore } from '@/store/character';
const { loadCharactersList, characters, loadCharacterById, currentCharacter } = useCharacterStore();
await loadCharactersList()
console.log(characters);
</script>

<style scoped>

</style>