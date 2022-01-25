import '../styles/globals.css';
import Layout from '../components/layout/layout';
import { UserContextProvider } from '../context/user-context';
import { NotificationContextProvider } from '../context/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </NotificationContextProvider>
  );
}

export default MyApp
