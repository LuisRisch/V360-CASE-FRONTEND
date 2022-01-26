import styles from './home.module.css';
import ListsCard from '../cards/lists-card/lists-card.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ListItemCard from '../cards/list-item-card/list-item-card.js';
import Button from '../ui/button/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import AddListModal from './add-list-modal';
import { api } from '../../services/api';
import NotificationContext from '../../context/notification-context';

/* Requires props
 * --lists,
 * --totalItems. */

function Home(props) {
  const notificationsContext = useContext(NotificationContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [openAddListModal, setOpenAddListModal] = useState(false);
  const [lists, setLists] = useState(props.lists || []);
  const [totalItems, setTotalItems] = useState(props.totalItems || 0);

  const onPreviousPage = () => handleChangePage('previous');

  const onNextPage = () => handleChangePage('next');

  const handleChangePage = (direction) => {
    let page = currentPage;

    if (direction === 'previous' || (page === Math.ceil(totalItems / 2) && lists.length === 1 && page !== 1))
      page--;
    else if (direction === 'next')
      page++;

    setCurrentPage(page);

    api.get(`/lists?page=${page}`)
      .then((response) => {
        if (response.statusText === 'OK') {
          setLists(response.data.lists);
          setTotalItems(response.data.total);
        }
      })
      .catch((err) => {
        let notification = {}

        notification.title = 'Falha ao carregar a lista';
        notification.status = "warning"

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = err.message;

        notificationsContext.showNotification(notification);
      })
  }

  const handleOpenAddListModal = () => {
    setOpenAddListModal(!openAddListModal);
  }

  const handleAddList = (title, description) => {
    let notification = {}

    api.post('/lists/post', { title, description })
      .then((response) => {
        if (response.statusText === "Created") {
          notification.title = 'Lista criada com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          handleChangePage('nothing');
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao criar a lista';
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

  const handleEditList = (listId, title, description) => {
    let notification = {};

    api.put(`/lists/${listId}`, { title, description })
      .then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          const newLists = lists.map((list) => {
            if (list._id === listId) {
              return response.data.list;
            }
            return list;
          });
          notification.title = 'Lista editada com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          setLists(newLists);
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao editar a lista';
        notification.status = 'warning';

        if (err.response)
          notification.message = err.response.data.message;
        else
          notification.message = "Ocorreu um erro desconhecido";
      })
      .finally(() => {
        notificationsContext.showNotification(notification);
      })
  }

  const handleDeleteList = (listId) => {
    let notification = {};

    api.delete(`/lists/${listId}`)
      .then((response) => {
        if (response.statusText === "OK") {
          notification.title = 'Lista excluída com sucesso';
          notification.message = response.data.message;
          notification.status = 'success';
          handleChangePage('nothing');
        }
      })
      .catch((err) => {
        notification.title = 'Falha ao excluir a lista';
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
      Suas listas TO DO
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faTasks} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      {
        lists.length > 0 ?
          lists.map(list => {
            return (
              <ListItemCard
                key={list._id}
                id={list._id}
                title={list.title}
                description={list.description}
                handleEditList={handleEditList}
                handleDeleteList={handleDeleteList}
              />
            )
          }) : "Você não possui nenhuma lista ainda :("
      }
    </>
  const CARD_FOOTER =
    <>
      <div>
        <Button
          label="Adicionar lista"
          type="button"
          icon={faPlus}
          onClick={handleOpenAddListModal}
        />
      </div>
      <div className={styles.footer_change_page}>
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
      <AddListModal
        openAddListModal={openAddListModal}
        handleOpenAddListModal={handleOpenAddListModal}
        handleAddList={handleAddList}
      />
      <ListsCard
        cardHeader={CARD_HEADER}
        cardBody={CARD_BODY}
        cardFooter={CARD_FOOTER}
      />
    </div>
  )
}

export default Home
