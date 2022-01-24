import { useState } from 'react';
import Modal from '../../modal/modal';
import Backdrop from '../../backdrop/backdrop';
import styles from './edit-task-modal.module.css';
import IconButton from '../../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../../ui/text-input/text-input';
import Button from '../../ui/button/button';

/* Required props 
 * --taskTitle; 
 * --taskDescription; 
 * --taskPriority; 
 * --openEditTaskModal; 
 * --handleOpenEditTaskModal;*/

function EditTaskModal(props) {
  const [taskTitle, setTaskTitle] = useState(props.taskTitle);
  const [taskDescription, setTaskDescription] = useState(props.taskDescription);
  const [taskPriority, setTaskPriority] = useState(props.taskPriority);

  const OPEN_EDIT_TASK_MODAL = props.openEditTaskModal || false;
  const HANDLE_OPEN_EDIT_TASK_MODAL = props.handleOpenEditTaskModal || function () { };
  const TASK_TITLE = props.taskTitle || "";

  const handleChangeTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  }

  const handleChangeTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  }

  const handleChangeTaskPriority = (event) => {
    setTaskPriority(event.target.value);
  }

  return (
    <>
      {OPEN_EDIT_TASK_MODAL && <Backdrop open={OPEN_EDIT_TASK_MODAL} onClick={HANDLE_OPEN_EDIT_TASK_MODAL} />}
      {OPEN_EDIT_TASK_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Edite a tarefa: {TASK_TITLE}
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_EDIT_TASK_MODAL}
                />
              </div>
            </div>
            <div className={styles.modal_body}>
              <div>
                <Input
                  label="Título"
                  placeholder="Digite o título da tarefa"
                  type="text"
                  htmlFor="task-title"
                  id="task-title"
                  name="task-title"
                  value={taskTitle}
                  onChange={handleChangeTaskTitle}
                />
              </div>
              <div>
                <Input
                  label="Descrição"
                  placeholder="Digite a descrição da tarefa"
                  type="text"
                  htmlFor="task-description"
                  id="task-description"
                  name="task-description"
                  value={taskDescription}
                  onChange={handleChangeTaskDescription}
                />
              </div>
              <div>
                <Input
                  label="Prioridade"
                  placeholder="Baixa, Média ou Alta"
                  type="text"
                  htmlFor="task-priority"
                  id="task-priority"
                  name="task-priority"
                  value={taskPriority}
                  onChange={handleChangeTaskPriority}
                />
              </div>
            </div>
            <div className={styles.modal_footer}>
              <div>
                <Button
                  label="Cancelar"
                  type="button"
                  onClick={HANDLE_OPEN_EDIT_TASK_MODAL}
                />
              </div>
              <div>
                <Button
                  label="Editar"
                  type="button"
                  onClick={() => {
                    console.log(taskTitle, taskDescription, taskPriority);
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

export default EditTaskModal
