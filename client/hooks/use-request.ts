import axios, { Method } from "axios";
import { useState } from "react";

interface Props {
    url: string,
    method: Method,
    body?: object,
    onSuccess?: () => void,
}

const useRequest = ({ url, method, body, onSuccess }: Props) => {
    const [errors, setErrors] = useState<any[]>([]);

    const doRequest = async () => {
        const uri = `${process.env.APP_API_URL}${url}`

        try {
            const res = await axios({
                method,
                url: uri,
                data: body,
                withCredentials: true
            });

            setErrors([]);
            console.log(res.status);
            

            if (onSuccess) {
                onSuccess();
            }
            return res.data;
        } catch (error) {
            if (error.response) {
                const msg = typeof error.response.data.message === 'string'
                    ? [error.response.data.message]
                    : [...error.response.data.message]
                setErrors(msg)
            }
        }
    }

    return { doRequest, errors };
}

export default useRequest