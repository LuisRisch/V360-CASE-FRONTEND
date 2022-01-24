import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './backdrop.module.css';

/* Required props 
 * open;
 * onClick. */

const Backdrop = (props) => {
  const OPEN = props.open || false;
  const ON_CLICK = props.onClick || function () { };

  /* Simple way to prevent next js from rendering when the document is undefined */
  useEffect(() => {
    return () => { }
  }, [])

  return createPortal(
    <div
      className={[styles.backdrop, OPEN ? 'open' : ''].join(' ')}
      onClick={ON_CLICK}
    />,
    document.getElementById('backdrop-root'));
}

export default Backdrop;
