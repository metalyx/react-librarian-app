import { Axios } from '../utils/Axios';

export async function getAllBooks() {
    try {
        const response = await Axios.get('/api/books');

        return response.data;
    } catch (e) {
        return null;
    }
}
