import { defineStore } from 'pinia'
import Character from "~/entities/character";
import RickAndMortyAPITransport from "~/transport";

export const useCharacterStore = defineStore('character', () => {
    const api = new RickAndMortyAPITransport();
    const endpoint = '/character';
    const characters = ref<Character[]>([]);
    const currentCharacter = ref<Character | null>(null);

    async function loadCharactersList() {
        const charactersFromApi = await api.getAll<Character>(endpoint);

        if (charactersFromApi) {
            characters.value = charactersFromApi
        }
    }

    async function loadCharacterById(id: number) {
        currentCharacter.value = await api.getOne<Character>(`${endpoint}/${id}`);
    }

    return {
        characters,
        currentCharacter,
        loadCharactersList,
        loadCharacterById,
    }
});