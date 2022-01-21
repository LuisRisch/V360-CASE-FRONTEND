import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from '../ui/icon-button';
import styles from './header.module.css';

function Header() {
  return (
    <div className={styles.container}>
      <IconButton 
        icon={faBars}
        color="var(--white)"
      />
      <div className={styles.logo}>
        Lista TODO
      </div>
    </div>
  )
}

export default Header
