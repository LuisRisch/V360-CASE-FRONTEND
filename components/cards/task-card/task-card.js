import { useState } from "react";
import styles from "./task-card.module.css";
import IconButton from '../../ui/icon-button/icon-button.js';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Tag from '../../tag/tag.js';
import EditTaskModal from './edit-task-modal';
import DeleteTaskModal from './delete-task-modal';

/* Required props 
 * --title; 
 * --description; 
 * --priority; 
 * --completed; 
 * --id;
 * --handleDeleteTask; 
 * --handleEditTask; 
 * --handleCheckTask. */

function TaskCard(props) {
  const TITLE = props.title || '';
  const DESCRIPTION = props.description || '';
  const PRIORITY = props.priority || '';
  const ID = props.id || '';
  const HANDLE_DELETE_TASK = props.handleDeleteTask || function () { };
  const HANDLE_EDIT_TASK = props.handleEditTask || function () { };
  const HANDLE_CHECK_TASK = props.handleCheckTask || function () { };
  const COMPLETED = props.completed || false;

  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);

  const handleOpenEditTaskModal = () => {
    setOpenEditTaskModal(!openEditTaskModal);
  };

  const handleOpenDeleteTaskModal = () => {
    setOpenDeleteTaskModal(!openDeleteTaskModal);
  };

  return (
    <div className={styles.card_container}>
      <DeleteTaskModal
        taskId={ID}
        taskTitle={TITLE}
        openDeleteTaskModal={openDeleteTaskModal}
        handleOpenDeleteTaskModal={handleOpenDeleteTaskModal}
        handleDeleteTask={HANDLE_DELETE_TASK}
      />
      <EditTaskModal
        taskId={ID}
        taskTitle={TITLE}
        taskDescription={DESCRIPTION}
        taskPriority={PRIORITY}
        openEditTaskModal={openEditTaskModal}
        handleOpenEditTaskModal={handleOpenEditTaskModal}
        handleEditTask={HANDLE_EDIT_TASK}
      />
      <div className={styles.task_status}>
        <div>
          <input type="checkbox" checked={COMPLETED} onChange={() => { HANDLE_CHECK_TASK(ID) }} />
        </div>
        <div>
          <Tag priority={PRIORITY} />
        </div>
      </div>
      <div className={styles.task_info}>
        <div className={styles.task_info_title} style={COMPLETED ? { textDecoration: 'line-through' } : {}}>
          {TITLE}
        </div>
        <div className={styles.task_info_description}>
          {DESCRIPTION}
        </div>
      </div>
      <div className={styles.task_actions}>
        {
          !COMPLETED &&
          <div>
            <IconButton
              color="var(--light--black)"
              icon={faEdit}
              onClick={handleOpenEditTaskModal}
            />
          </div>
        }
        <div>
          <IconButton
            color="var(--light--black)"
            icon={faTrashAlt}
            onClick={handleOpenDeleteTaskModal}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
