import styles from './button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Required props 
 * --label; 
 * --type;
 * --icon;
 * --onClick. */


function Button(props) {
  let LABEL = props.label || "";
  let TYPE = props.type || "button";
  let ICON = props.icon || "";
  let ON_CLICK = props.onClick || function () { };

  return (
    <button
      type={TYPE}
      onClick={ON_CLICK}
      className={styles.button}
    >
      <div className={styles.button_content}>
        <div>
          {LABEL}
        </div>
        {
          LABEL && ICON && <div className={styles.sized_box} />
        }
        <div>
          {
            ICON && <FontAwesomeIcon icon={ICON} />
          }
        </div>
      </div>
    </button>
  );
}

export default Button
