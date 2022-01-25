import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './list-item-card.module.css'
import IconButton from '../../ui/icon-button/icon-button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import EditListModal from './edit-list-modal.js';
import DeleteListModal from './delete-list-modal.js';

/* Required props 
 * --id;
 * --title; 
 * --description;
 * --handleDeleteList; 
 * --handleEditList. */

function ListItemCard(props) {
  const router = useRouter();

  const [openDeleteListModal, setOpenDeleteListModal] = useState(false);
  const [openEditListModal, setOpenEditListModal] = useState(false);

  const ID = props.id || "";
  const TITLE = props.title || "";
  const DESCRIPTION = props.description || "";
  const HANDLE_DELETE_LIST = props.handleDeleteList || function () { };
  const HANDLE_EDIT_LIST = props.handleEditList || function () { };

  const handleOpenDeleteListModal = () => {
    setOpenDeleteListModal(!openDeleteListModal);
  }

  const handleOpenEditListModal = () => {
    setOpenEditListModal(!openEditListModal);
  }

  return (
    <div className={styles.card_container}>
      <EditListModal
        openEditListModal={openEditListModal}
        handleOpenEditListModal={handleOpenEditListModal}
        handleEditList={HANDLE_EDIT_LIST}
        listId={ID}
        listTitle={TITLE}
        listDescription={DESCRIPTION}
      />
      <DeleteListModal 
        openDeleteListModal={openDeleteListModal}
        handleOpenDeleteListModal={handleOpenDeleteListModal}
        handleDeleteList={HANDLE_DELETE_LIST}
        listId={ID}
        listTitle={TITLE}
      />
      <div className={styles.card_header}>
        {TITLE}
      </div>
      <div className={styles.card_body}>
        {DESCRIPTION}
      </div>
      <div className={styles.card_footer}>
        <div>
          <IconButton
            icon={faEdit}
            onClick={handleOpenEditListModal}
            color="var(--light--black)"
          />
        </div>
        <div>
          <IconButton
            icon={faTrashAlt}
            onClick={handleOpenDeleteListModal}
            color="var(--light--black)"
          />
        </div>
        <div>
          <IconButton
            icon={faExternalLinkAlt}
            onClick={() => { router.push(`/${ID}`) }}
            color="var(--light--black)"
          />
        </div>
      </div>
    </div>
  )
}

export default ListItemCard
