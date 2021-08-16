import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import type { AppContext, AppProps } from 'next/app'
import buildClient from '../helpers/build-client';
import MyNavbar from '../components/navbar';

export interface User {
  id: number,
  email: string,
  isGoogleAuth: boolean
}

export interface MyProps extends AppProps {
  user: User
}

function MyApp({ Component, pageProps, user }: MyProps) {
  return (
    <>
      <MyNavbar user={user} />
      <Component {...pageProps} user={user}/>
    </>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const client = buildClient(appContext.ctx);
  let user;

  try {
    const { data } = await client.get('/api/auth/me');
    user = data;
  } catch (error) { }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
    );
  }

  return {
    pageProps,
    user
  };
}

export default MyApp
