import Modal from '../../modal/modal';
import Backdrop from '../../backdrop/backdrop';
import styles from './delete-list-modal.module.css';
import IconButton from '../../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../../ui/button/button';

/* Requires props
 * --listId
 * --listTitle; 
 * --openDeleteListModal; 
 * --handleOpenDeleteListModal;; 
 * --handleDeleteList. */

function DeleteListModal(props) {

  const LIST_ID = props.listId || '';
  const OPEN_DELETE_LIST_MODAL = props.openDeleteListModal || false;
  const HANDLE_OPEN_DELETE_LIST_MODAL = props.handleOpenDeleteListModal || function () { };
  const LIST_TITLE = props.listTitle || "";
  const HANDLE_DELETE_LIST = props.handleDeleteList || function () { };

  return (
    <>
      {OPEN_DELETE_LIST_MODAL && <Backdrop open={OPEN_DELETE_LIST_MODAL} onClick={HANDLE_OPEN_DELETE_LIST_MODAL} />}
      {OPEN_DELETE_LIST_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Deletar a lista: {LIST_TITLE} ?
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_DELETE_LIST_MODAL}
                />
              </div>
            </div>
            <div className={styles.modal_body}>
              Tem certeza que deseja deletar essa lista?
            </div>
            <div className={styles.modal_footer}>
              <div>
                <Button
                  label="Não"
                  type="button"
                  onClick={HANDLE_OPEN_DELETE_LIST_MODAL}
                />
              </div>
              <div>
                <Button
                  label="Sim"
                  type="button"
                  onClick={() => {
                    HANDLE_DELETE_LIST(LIST_ID);
                    HANDLE_OPEN_DELETE_LIST_MODAL();
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteListModal
