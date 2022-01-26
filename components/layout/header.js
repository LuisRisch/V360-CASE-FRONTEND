import styles from './header.module.css';
import IconButton from '../ui/icon-button/icon-button';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/user-context';
import { useContext } from 'react';

function Header() {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      {
        userContext.isLoggedIn &&
        <IconButton
          icon={faSignOutAlt}
          onClick={userContext.signOut}
        />
      }
      <div className={styles.logo}>
        Lista TO DO
      </div>
    </div>
  )
}

export default Header
