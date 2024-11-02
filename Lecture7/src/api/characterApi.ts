import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
    image: string;
}

export interface CharactersResponse {
    info: {
        pages: number;
    };
    results: Character[];
}

export const fetchCharacters = async (page: number): Promise<CharactersResponse> => {
    try {
        const response: AxiosResponse<CharactersResponse> = await axios.get(`${API_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching characters for page ${page}:`, error);
        throw new Error("Failed to fetch characters");
    }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
    try {
        const response: AxiosResponse<Character> = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching character with ID ${id}:`, error);
        throw new Error("Failed to fetch character");
    }
};
