import axios from 'axios';

/**
 * Transport class, which is responsible for making HTTP requests
 */
export default class Transport {
    private readonly baseURL: string;

    /**
     * Constructor for Transport class
     * @param baseURL
     */
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Method for making HTTP GET requests
     *
     * @param endpoint - the endpoint to make the request to
     * @param params - request params
     * @returns the response data
     */
    public async get<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
        try {
            const searchParams = new URLSearchParams(params);
            const response = await axios.get<T>(`${this.baseURL}${endpoint}`, {
                params: searchParams
            });
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}