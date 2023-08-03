import { defineStore } from 'pinia'
import Character from "~/entities/character";
import RickAndMortyAPITransport from "~/transport";

const api = new RickAndMortyAPITransport();

export const useCharacterStore = defineStore( {
    id: 'character',
    state: () => {
        return {
            endpoint: '/character',
            characters: [] as Character[],
            page: 1,
        }
    },
    getters: {
        getCharacters: state => state.characters,
    },
    actions: {
        async loadCharactersList() {
            const charactersFromApi = await api.getAll<Character>(this.endpoint + `?page=${this.page}`);

            if (charactersFromApi) {
                this.characters.push(...charactersFromApi.results);
            }

            this.page++;
        },
    },
    persist: {
        paths: ['characters', 'currentCharacter', 'page'],
        storage: localStorage
    }
});