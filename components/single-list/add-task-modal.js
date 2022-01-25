import { useState } from 'react';
import Modal from '../modal/modal';
import Backdrop from '../backdrop/backdrop';
import styles from './add-task-modal.module.css';
import IconButton from '../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../ui/text-input/text-input';
import Button from '../ui/button/button';

/* Required props
 * --openAddTaskModal; 
 * --handleOpenAddTaskModal; 
 * --handleAddTask;
 * --listTitle. */

function AddTaskModal(props) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const OPEN_ADD_TASK_MODAL = props.openAddTaskModal || false;
  const HANDLE_OPEN_ADD_TASK_MODAL = props.handleOpenAddTaskModal || function () { };
  const HANDLE_ADD_TASK = props.handleAddTask || function () { };
  const LIST_TITLE = props.listTitle || "";

  const resetFields = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("");
  }

  const handleChangeTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  }

  const handleChangeTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  }

  const handleChangeTaskPriority = (event) => {
    setTaskPriority(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    HANDLE_ADD_TASK(taskTitle, taskDescription, taskPriority);
    HANDLE_OPEN_ADD_TASK_MODAL();
    resetFields();
  }

  return (
    <>
      {OPEN_ADD_TASK_MODAL && <Backdrop open={OPEN_ADD_TASK_MODAL} onClick={HANDLE_OPEN_ADD_TASK_MODAL} />}
      {OPEN_ADD_TASK_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Adicione uma tarefa a lista: {LIST_TITLE}
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_ADD_TASK_MODAL}
                />
              </div>
            </div>
            <div>
              <form className={styles.modal_body} onSubmit={onSubmit}>
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
                <input type="submit" style={{ display: "none" }} />
              </form>
            </div>
            <div className={styles.modal_footer}>
              <div>
                <Button
                  label="Cancelar"
                  type="button"
                  onClick={HANDLE_OPEN_ADD_TASK_MODAL}
                />
              </div>
              <div>
                <Button
                  label="Adicionar"
                  type="button"
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddTaskModal
