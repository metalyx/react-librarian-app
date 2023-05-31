import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';

export const Axios = axios.create({
    baseURL: BASE_URL,
});

export const setToken = (token: string) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
