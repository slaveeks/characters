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
            allCharactersLoaded: false,
            currentCharacter: null as Character | null,
        }
    },
    getters: {
        getCharacters: state => state.characters,
    },
    actions: {
        async loadCharactersList() {
            if (this.allCharactersLoaded) {
                return;
            }
            const charactersFromApi = await api.getAll<Character>(this.endpoint + `?page=${this.page}`);

            if (charactersFromApi) {
                this.characters.push(...charactersFromApi.results);
            }

            if (charactersFromApi?.info.next === null) {
                this.allCharactersLoaded = true;
            }

            this.page++;
        },
        async loadCharacter(id: number) {
            const characterFromStore = this.characters.find(character => character.id === id);
            if (characterFromStore) {
                this.currentCharacter = characterFromStore;
                return;
            }

            this.currentCharacter =  await api.getOne<Character>(this.endpoint + `/${id}`);
        }
    },
    persist: {
        paths: ['characters', 'currentCharacter', 'page', 'allCharactersLoaded'],
        storage: localStorage
    }
});