import { iUser } from '../models/iUser';
import { Axios } from '../utils/Axios';

export async function getUserInfo(): Promise<iUser | never> {
    try {
        const userInfo = await Axios.get('/api/auth/getUserInfo');
        return userInfo.data;
    } catch (e) {
        console.error(e);
        throw new Error('Cannot fetch user Info');
    }
}
