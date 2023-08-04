/**
 * Character status enum
 */
export enum Status {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown'
}
/**
 * Character interface
 */
export default interface Character {
    /**
     * Character identifier to be used as key
     */
    id: number;

    /**
     * Character name
     */
    name: string;

    /**
     * Character status, can be Alive, Dead or unknown
     */
    status: Status;

    /**
     * Character image URL
     */
    image: string;

    /**
     * Character episode list, each episode is a url
     */
    episode: string[];
}