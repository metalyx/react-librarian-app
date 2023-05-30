import axios from 'axios';

const token = () => {
    if (window) {
        const token = window.localStorage.getItem('token');

        return token ?? null;
    } else {
        return null;
    }
};

export default axios.create({
    baseURL: 'https://express-librarian.herokuapp.com/',
    headers: {
        Authorization: token() ? `Bearer ${token()}` : null,
    },
});
