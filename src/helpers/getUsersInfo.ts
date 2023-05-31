import { Axios } from '../utils/Axios';

export async function getUsersInfo() {
    try {
        const allUsers = await Axios.get('/api/staff/getUsers');

        return allUsers.data;
    } catch (e) {
        throw new Error('Cannot fetch users');
    }
}
