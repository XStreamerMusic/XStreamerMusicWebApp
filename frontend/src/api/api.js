import Cookies from 'js-cookie'
import axios from 'axios';

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL || '/',
        withCredentials: true,
    }
)

export const fetchCsrfToken = async () => {
    const res = await api.get('/api/csrf/')  // Django sets the csrftoken cookie in this response
    Cookies.set('csrftoken', res.data.csrfToken);
};

// check for csrf token in cookies
api.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('csrftoken');

        if (csrfToken) {
            config.headers["X-CSRFToken"] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 403) {
                console.error(error.response);
            }

            if (status === 500) {
                console.error(error.response);
            }
        } else {
            console.error("Network error:", error);
        }

        return Promise.reject(error);
    }
);

export default api