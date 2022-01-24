import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Required props 
 * --color; 
 * --icon;  
 * --onClick. */

function IconButton(props) {
  const COLOR = props.color || "#fff";
  const ICON = props.icon || "";
  const ON_CLICK = props.onClick || function () { };

  return (
    <FontAwesomeIcon
      icon={ICON}
      color={COLOR}
      onClick={ON_CLICK}
      style={{ cursor: "pointer" }}
    />
  )
}

export default IconButton
