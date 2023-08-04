import { defineStore } from 'pinia'
import Character from "~/entities/character";
import RickAndMortyAPITransport from "~/transport";

const api = new RickAndMortyAPITransport();

export const useCharacterStore = defineStore( {
    id: 'character',
    state: () => ({
        endpoint: '/character',
        characters: [] as Character[],
        page: 1,
        allCharactersLoaded: false,
        currentCharacter: null as Character | null,
        nameFilter: "",
    }),
    actions: {
        async loadCharactersList(name: string) {
            if (name != this.nameFilter) {
                this.nameFilter = name;
                this.characters = [];
                this.page = 1;
                this.allCharactersLoaded = false;
            }

            let a = '';
            if (this.nameFilter) {
                a = `&name=${this.nameFilter}`;
            }

            if (this.allCharactersLoaded) {
                return;
            }
            const charactersFromApi = await api.getAll<Character>(this.endpoint + `/?page=${this.page}${a}`);

            if (charactersFromApi) {
                this.characters.push(...charactersFromApi.results);
            } else {
                return;
            }

            if (charactersFromApi?.info.next === null) {
                this.allCharactersLoaded = true;
                return;
            }
            this.page++;
        },
        async loadCharacter(id: number) {
            const characterFromStore = this.characters.find(character => character.id === id);
            if (characterFromStore) {
                this.currentCharacter = characterFromStore;
                return;
            }

            this.currentCharacter = await api.getOne<Character>(this.endpoint + `/${id}`);
        }
    },
    persist: {
        paths: ['characters', 'currentCharacter', 'page', 'allCharactersLoaded', 'nameFilter'],
        storage: localStorage
    }
});