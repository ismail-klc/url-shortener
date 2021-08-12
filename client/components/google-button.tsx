import GoogleLogin from 'react-google-login';
import useGoogleAuthentication from './use-google-auth';

function GoogleButton() {
    const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
    const { handleSuccess } = useGoogleAuthentication();

    const onFailure = (err: any) => {
        console.log("failed", err);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Log in with Google"
            onFailure={onFailure}
            onSuccess={handleSuccess}
        />
    )
}

export default GoogleButton
