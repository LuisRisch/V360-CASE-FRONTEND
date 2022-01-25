import Header from './header';
import Toast from '../ui/toast/toast';
import NotificationContext from '../../context/notification-context';
import { useContext } from 'react';

function Layout(props) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;

  return (
    <>
      {
        activeNotification &&
        <Toast
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      }
      <Header />
      {props.children}
    </>
  )
}

export default Layout
