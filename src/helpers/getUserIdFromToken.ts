import { Axios, setToken } from '../utils/Axios';

export async function getUserIdFromToken(): Promise<string | null> {
    if (!window) {
        throw new Error('No window object was found...');
    }

    const token = window.localStorage.getItem('token');

    if (!token) {
        return null;
    } else {
        setToken(token);
    }

    try {
        const response = await Axios.get('/api/auth/checkToken');

        if (response.status >= 400) {
            // Token is expired or invalid
            return null;
        } else {
            // Token is ok, return userId
            return response.data.id;
        }
    } catch (e) {
        return null;
    }
}
