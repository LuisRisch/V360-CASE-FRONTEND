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
 * --taskId. */

function TaskCard(props) {
  const TITLE = props.title || '';
  const DESCRIPTION = props.description || '';
  const PRIORITY = props.priority || '';

  const [checked, setChecked] = useState(props.completed || false);
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
        taskTitle={TITLE}
        openDeleteTaskModal={openDeleteTaskModal}
        handleOpenDeleteTaskModal={handleOpenDeleteTaskModal}
      />
      <EditTaskModal
        taskTitle={TITLE}
        taskDescription={DESCRIPTION}
        taskPriority={PRIORITY}
        openEditTaskModal={openEditTaskModal}
        handleOpenEditTaskModal={handleOpenEditTaskModal}
      />
      <div className={styles.task_status}>
        <div>
          <input type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
        </div>
        <div>
          <Tag priority={PRIORITY} />
        </div>
      </div>
      <div className={styles.task_info}>
        <div className={styles.task_info_title} style={checked ? { textDecoration: 'line-through' } : {}}>
          {TITLE}
        </div>
        <div className={styles.task_info_description}>
          {DESCRIPTION}
        </div>
      </div>
      <div className={styles.task_actions}>
        <div>
          <IconButton
            color="var(--light--black)"
            icon={faEdit}
            onClick={handleOpenEditTaskModal}
          />
        </div>
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
