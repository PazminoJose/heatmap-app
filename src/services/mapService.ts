import { CoordinatesAndAPIKeyResponse } from '../interfaces/interfaces';
import { getErrorMessage } from '../utils/getErrorMessage';
const API_URL = process.env.REACT_APP_API_URL;

export async function getCoordinatesAndApiKey(): Promise<CoordinatesAndAPIKeyResponse | string> {
    try {
        const data = await fetch(new URL(API_URL));
        const { api_key, coordinates } = await data.json();
        return { api_key, coordinates };
    }
    catch (error) {
        return getErrorMessage(error);
    }
}