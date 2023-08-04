import Transport from "~/transport/transport.axios";
import GetAllResponse from "~/transport/rickandmortyapi/types/HttpResponse";

/**
 * Transport class, which is responsible for making HTTP requests to the Rick and Morty API
 */
export default class RickAndMortyAPITransport extends Transport {
    constructor() {
        super('https://rickandmortyapi.com/api');
    }

    /**
     * Method for making HTTP GET requests to the Rick and Morty API and returning all entities
     * @param endpoint - the endpoint to make the request to
     * @returns the response data, which is an array of entities
     */
    public async getAll<Entity>(endpoint: string): Promise<GetAllResponse<Entity> | null> {
        try {
            return await this.get<GetAllResponse<Entity>>(endpoint);
        } catch (e: any) {
            console.error(e);
            return null;
        }
    }

    /**
     * Method for making HTTP GET requests to the Rick and Morty API and returning a single entity
     * @param endpoint - the endpoint to make the request to
     * @returns the response data, which is a single entity
     */
    public async getOne<Entity>(endpoint: string): Promise<Entity | null> {
        const response = await this.get<Entity>(endpoint);
        /**
         * If the response is null, return null
         */
        if (!response) {
            return null;
        }
        return response;
    }
}