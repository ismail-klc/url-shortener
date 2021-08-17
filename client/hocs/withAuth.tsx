import Login from "../pages/auth/login";

const withAuth = (Component: any) => {
    const Auth = (props: any) => {
        if (props.user) {
            return <Component {...props} />;
        }

        return <Login />
    };

    return Auth;
};

export default withAuth;