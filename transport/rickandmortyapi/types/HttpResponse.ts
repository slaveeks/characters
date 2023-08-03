/**
 * A generic response from the API, which is an array of entities, e.g. Character[]
 */
export default interface GetAllResponse<Entity> {
    /**
     * Info about the response
     */
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }
    /**
     * Results of the response, which is an array of entities, e.g. Character[]
     */
    results: Entity[];
}

/**
 * A generic response from the API, which is a single entity, e.g. Character
 */
export interface GetOneResponse<Entity> {
    /**
     * The entity
     */
    entity: Entity;
}