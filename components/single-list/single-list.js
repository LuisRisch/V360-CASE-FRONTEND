import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './single-list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SingleListCard from '../cards/single-list-card/single-list-card.js';
import TaskCard from '../cards/task-card/task-card.js';
import Button from '../ui/button/button';
import AddTaskModal from './add-task-modal';
import { api } from '../../services/api';
import NotificationContext from '../../context/notification-context';

/* Requires props 
 * --list; 
 * --totalItems; 
 * --tasks. */

function SingleList(props) {
  const router = useRouter();
  const notificationsContext = useContext(NotificationContext);

  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState(props.tasks || []);
  const [totalItems, setTotalItems] = useState(props.totalItems || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(props.list || {});

  const onPreviousPage = () => handleChangePage('previous');

  const onNextPage = () => handleChangePage('next');

  const handleChangePage = (direction) => {
    let page = currentPage;

    if (direction === 'previous' || (page === Math.ceil(totalItems / 2) && tasks.length === 1 && page !== 1))
      page--;
    else if (direction === 'next')
      page++;

    setCurrentPage(page);

    api.get(`/lists/${list._id}?page=${page}`)
      .then((response) => {
        if (response.statusText === 'OK') {
          setList(response.data.list);
          setTasks(response.data.tasks);
          setTotalItems(response.data.total);
        }
      })
      .catch((err) => {
        let notification = {}

        notification.title = 'Falha ao carregar as tarefas';
        notification.status = "warning"

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = err.message;

        notificationsContext.showNotification(notification);
      })
  }

  const goBack = () => {
    router.back()
  }

  const handleOpenAddTaskModal = () => {
    setOpenAddTaskModal(!openAddTaskModal);
  }

  const handleAddTask = (title, description, priority) => {
    let notification = {};

    api.post('/tasks/post', { title, description, priority, listId: list._id })
      .then((response) => {
        if (response.statusText === "Created") {
          notification.title = 'Tarefa criada com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          handleChangePage('nothing');
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao criar a tarefa';
        notification.status = 'warning';

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';
      })
      .finally(() => {
        notificationsContext.showNotification(notification);
      })
  }

  const handleDeleteTask = (taskId) => {
    let notification = {};

    api.delete('/tasks/' + taskId)
      .then((response) => {
        if (response.statusText === "OK") {
          notification.title = 'Tarefa deletada com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          handleChangePage('nothing');
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao deletar a tarefa';
        notification.status = 'warning';

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';
      })
      .finally(() => {
        notificationsContext.showNotification(notification);
      })
  }

  const handleEditTask = (taskId, title, description, priority) => {
    let notification = {};

    api.put('/tasks/' + taskId, { title, description, priority })
      .then((response) => {
        if (response.statusText === "OK") {
          notification.title = 'Tarefa editada com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          setTasks(tasks.map(task => task._id === taskId ? response.data.task : task));
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao editar a tarefa';
        notification.status = 'warning';

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';
      })
      .finally(() => {
        notificationsContext.showNotification(notification);
      })
  }

  const handleCheckTask = (taskId) => {
    let notification = {};

    api.put('/tasks/' + taskId + '/check')
      .then((response) => {
        if (response.statusText === "OK") {
          notification.title = response.data.task.completed ? 'Tarefa concluída com sucesso' : 'Tarefa não concluída';
          notification.message = response.data.message;
          notification.status = 'success';
          setTasks(tasks.map(task => task._id === taskId ? response.data.task : task));
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao concluir a tarefa';
        notification.status = 'warning';

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';
      })
      .finally(() => {
        notificationsContext.showNotification(notification);
      })
  }

  const CARD_HEADER =
    <>
      {list.title}
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faTasks} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      {
        tasks.length > 0 ?
          tasks.map((task, index) => {
            return (
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                completed={task.completed}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                handleCheckTask={handleCheckTask}
              />
            )
          }) : "Essa lista não possui nenhuma tarefa ainda :("
      }
    </>
  const CARD_FOOTER =
    <>
      <div className={styles.footer_actions_button}>
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
      </div>
      <div className={styles.footer_actions_button}>
        {
          currentPage > 1 &&
          <div>
            <Button
              label=""
              type="button"
              icon={faArrowLeft}
              onClick={onPreviousPage}
            />
          </div>
        }
        {
          currentPage < Math.ceil(totalItems / 2) &&
          <div>
            <Button
              label=""
              type="button"
              icon={faArrowRight}
              onClick={onNextPage}
            />
          </div>
        }
      </div>
    </>

  return (
    <div className={styles.container}>
      <AddTaskModal
        listTitle={list.title}
        openAddTaskModal={openAddTaskModal}
        handleOpenAddTaskModal={handleOpenAddTaskModal}
        handleAddTask={handleAddTask}
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
