import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './single-list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SingleListCard from '../cards/single-list-card/single-list-card.js';
import TaskCard from '../cards/task-card/task-card.js';
import Button from '../ui/button/button';
import AddTaskModal from './add-task-modal';

/* Requires props 
 * --list. */

function SingleList(props) {
  const router = useRouter();
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  const goBack = () => {
    router.back()
  }

  const handleOpenAddTaskModal = () => {
    setOpenAddTaskModal(!openAddTaskModal);
  }

  const LIST = props.list || {};
  const CARD_HEADER =
    <>
      {LIST.title}
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faTasks} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      {
        LIST.tasks &&
        LIST.tasks.map((task, index) => {
          return (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              priority={task.priority}
              completed={task.completed}
            />
          )
        })
      }
    </>
  const CARD_FOOTER =
    <>
      <div>
        <Button
          label="Voltar"
          type="button"
          onClick={goBack}
        />
      </div>
      <div>
        <Button
          label="Adicionar tarefa"
          type="button"
          icon={faPlus}
          onClick={handleOpenAddTaskModal}
        />
      </div>
    </>

  return (
    <div className={styles.container}>
      <AddTaskModal
        listTitle={LIST.title}
        openAddTaskModal={openAddTaskModal}
        handleOpenAddTaskModal={handleOpenAddTaskModal}
      />
      <SingleListCard
        cardHeader={CARD_HEADER}
        cardBody={CARD_BODY}
        cardFooter={CARD_FOOTER}
      />
    </div>
  )
}

export default SingleList
