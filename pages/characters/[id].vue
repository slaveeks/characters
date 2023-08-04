<template>
  <div v-if="character">
    {{ character.name }}
  </div>
  <div v-else>
    Character not found
  </div>
</template>

<script setup>
import {useCharacterStore} from "~/store/character";
import {useRoute} from "#app";

const router = useRoute()

const characterId = router.params.id;

const store = useCharacterStore();

const character = computed(() => store.currentCharacter);
store.loadCharacter(characterId);
</script>

<style scoped>

</style>