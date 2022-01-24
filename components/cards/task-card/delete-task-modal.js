import Modal from '../../modal/modal';
import Backdrop from '../../backdrop/backdrop';
import styles from './delete-task-modal.module.css';
import IconButton from '../../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../../ui/button/button';

/* Requires props 
 * --taskTitle; 
 * --openDeleteTaskModal; 
 * --handleDeleteTaskModal. */

function DeleteTaskModal(props) {

  const OPEN_DELETE_TASK_MODAL = props.openDeleteTaskModal || false;
  const HANDLE_OPEN_DELETE_TASK_MODAL = props.handleOpenDeleteTaskModal || function () { };
  const TASK_TITLE = props.taskTitle || "";

  return (
    <>
      {OPEN_DELETE_TASK_MODAL && <Backdrop open={OPEN_DELETE_TASK_MODAL} onClick={HANDLE_OPEN_DELETE_TASK_MODAL} />}
      {OPEN_DELETE_TASK_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Deletar a tarefa: {TASK_TITLE} ?
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_DELETE_TASK_MODAL}
                />
              </div>
            </div>
            <div className={styles.modal_body}>
              Tem certeza que deseja deletar essa tarefa?
            </div>
            <div className={styles.modal_footer}>
              <div>
                <Button
                  label="Não"
                  type="button"
                  onClick={HANDLE_OPEN_DELETE_TASK_MODAL}
                />
              </div>
              <div>
                <Button
                  label="Sim"
                  type="button"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteTaskModal
