import { defineStore } from 'pinia'
import Character, {Status} from "~/entities/character";
import RickAndMortyAPITransport from "~/transport";

/**
 *  Define api to get data
 */
const api = new RickAndMortyAPITransport();

/**
 * Define api endpoint for character
 */
const endpoint = '/character'

/**
 * Reactive and persistent store for characters
 */
export const useCharacterStore = defineStore( {
    id: 'character',
    state: () => ({
        /**
         * Characters in store
         */
        characters: [] as Character[],

        /**
         * Current characters page (for pagination)
         */
        page: 1,
        allCharactersLoaded: false,
        /**
         * Current character, for displaying one character
         */
        currentCharacter: null as Character | null,

        /**
         * Current characters name filter
         */
        nameFilter: '',

        /**
         * Current character status filter
         */
        statusFilter: '',
    }),
    actions: {
        /**
         * Load characters list by filters, updates characters[] if needed
         *
         * @param name - name filter for characters
         * @param status - character status
         */
        async loadCharactersList(name: string, status: Status) {
            /**
             * Check if filters updated, if yes, clear data, update filters
             */
            if (name != this.nameFilter || status != this.statusFilter) {
                this.statusFilter = status;
                this.nameFilter = name;
                this.characters = [];
                this.page = 1;
                this.allCharactersLoaded = false;
            }

            /**
             * Declare params for api request
             */
            const params: Record<string, string> = {
                'page': this.page.toString(),
                'status': this.statusFilter,
                'name': this.nameFilter
            }

            /**
             * Stop action, if all data loaded to store
             */
            if (this.allCharactersLoaded) {
                return;
            }

            const charactersFromApi = await api.getAll<Character>(endpoint, params);

            if (charactersFromApi) {
                this.characters.push(...charactersFromApi.results);
            } else {
                /**
                 * If there is no data from api stop ation
                 */
                return;
            }

            /**
             * Check if there next page of characters
             */
            if (charactersFromApi.info.next === null) {
                this.allCharactersLoaded = true;
                return;
            }
            this.page++;
        },

        /**
         * Load one character, get from store, or update currentCharacter
         * @param id - character unique identifier
         */
        async loadCharacter(id: number) {
            /**
             * Check if current character is not empty in store, and check id, if it consists, stop action
             */
            if (this.currentCharacter && this.currentCharacter.id == id) {
                return;
            }

            /**
             * Get character by id from character[] store
             */
            const characterFromStore = this.characters.find(character => character.id === id);

            /**
             * Updated current character, if it founded in character[], stop action
             */
            if (characterFromStore) {
                this.currentCharacter = characterFromStore;
                return;
            }

            /**
             * Get character from api
             */
            this.currentCharacter = await api.getOne<Character>(endpoint + `/${id}`);
        }
    },
    persist: {
        paths: ['characters', 'currentCharacter', 'page', 'allCharactersLoaded', 'nameFilter', 'statusFilter'],
        storage: sessionStorage
    }
});