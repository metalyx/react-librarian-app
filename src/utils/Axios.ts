// import axios from 'axios';
// import { BASE_URL } from '../components/constants/BASE_URL';

// const token = () => {
//     if (window) {
//         const token = window.localStorage.getItem('token');

//         return token ?? null;
//     } else {
//         return null;
//     }
// };

// export default axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: token() ? `Bearer ${token()}` : null,
//     },
// });

import axios from 'axios';
import { BASE_URL } from '../components/constants/BASE_URL';

export const Axios = axios.create({
    baseURL: BASE_URL,
});

export const setToken = (token: string) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
