import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

/* Required props 
 * children. */

function Modal(props) {
  const CHILDREN = props.children || <div></div>

  /* Simple way to prevent next js from rendering when the document is undefined */
  useEffect(() => {
    return () => { }
  }, [])

  return createPortal(
    <div className={styles.modal}>
      {CHILDREN}
    </div>,
    document.getElementById('modal-root')
  );

}


export default Modal;
