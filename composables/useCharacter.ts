import Character from "~/entities/character";
import Transport from "~/transport";

const useCharacter = () => {
    const transport = new Transport('https://rickandmortyapi.com/api/character');

    /**
     * @todo define store
     */

    const character = ref<Character | null>();

    const getCharacter = async (id: number) => {
        /**
         * @todo get from store
         */
        character.value = await transport.get<Character>(`/${id}`);
        /**
         * @todo save to store
         */
    }

    return {
        character,
        getCharacter
    }
}

export default useCharacter;