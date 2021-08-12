import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import Router from 'next/router'

function useGoogleAuthentication() {
    const handleSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('accessToken' in response) {
            const profile = response.profileObj;

            try {
                await fetch(`${process.env.APP_API_URL}/api/auth/google`, {
                    method: 'POST',
                    body: JSON.stringify({
                        profile
                    }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                Router.push('/')
            } catch (error) {
                
            }

        }
    }

    return {
        handleSuccess,
    }
}

export default useGoogleAuthentication;