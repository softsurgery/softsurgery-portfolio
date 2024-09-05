import _axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_SERVER_URL;

export const axios = _axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
