import axios from 'axios';

const buildClient = (props: any) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: process.env.APP_API_URL,
            headers: props.req.headers,
            withCredentials: true
        });
    }

    // we must be on the browser
    return axios.create({
        baseURL: process.env.APP_API_URL,
        withCredentials: true
    });
}

export default buildClient;