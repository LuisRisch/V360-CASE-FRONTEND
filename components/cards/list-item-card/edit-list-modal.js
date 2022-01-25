import { useState, useEffect } from 'react';
import Modal from '../../modal/modal';
import Backdrop from '../../backdrop/backdrop';
import styles from './edit-list-modal.module.css';
import IconButton from '../../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../../ui/text-input/text-input';
import Button from '../../ui/button/button';

/* Required props 
 * --listId;
 * --listTitle; 
 * --listDescription; 
 * --openEditListModal; 
 * --handleOpenEditListModal;
 * --handleEditList. */

function EditListModal(props) {
  const [listTitle, setListTitle] = useState(props.listTitle);
  const [listDescription, setListDescription] = useState(props.listDescription);

  const LIST_ID = props.listId || "";
  const OPEN_EDIT_LIST_MODAL = props.openEditListModal || false;
  const HANDLE_OPEN_EDIT_LIST_MODAL = props.handleOpenEditListModal || function () { };
  const LIST_TITLE = props.listTitle || "";
  const HANDLE_EDIT_LIST = props.handleEditList || function () { };

  const resetFields = () => {
    if (listTitle.length === 0)
      setListTitle(props.listTitle);
    if (listDescription.length === 0)
      setListDescription(props.listDescription);
  }

  const handleChangeListTitle = (event) => {
    setListTitle(event.target.value);
  }

  const handleChangeListDescription = (event) => {
    setListDescription(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    HANDLE_EDIT_LIST(LIST_ID, listTitle, listDescription);
    HANDLE_OPEN_EDIT_LIST_MODAL();
    resetFields();
  }

  return (
    <>
      {OPEN_EDIT_LIST_MODAL && <Backdrop open={OPEN_EDIT_LIST_MODAL} onClick={HANDLE_OPEN_EDIT_LIST_MODAL} />}
      {OPEN_EDIT_LIST_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Edite a lista: {LIST_TITLE}
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_EDIT_LIST_MODAL}
                />
              </div>
            </div>
            <div>
              <form className={styles.modal_body} onSubmit={onSubmit}>
                <div>
                  <Input
                    label="Título"
                    placeholder="Digite o título da lista"
                    type="text"
                    htmlFor="list-title"
                    id="list-title"
                    name="list-title"
                    value={listTitle}
                    onChange={handleChangeListTitle}
                  />
                </div>
                <div>
                  <Input
                    label="Descrição"
                    placeholder="Digite a descrição da lista"
                    type="text"
                    htmlFor="list-description"
                    id="list-description"
                    name="list-description"
                    value={listDescription}
                    onChange={handleChangeListDescription}
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
                  onClick={HANDLE_OPEN_EDIT_LIST_MODAL}
                />
              </div>
              <div>
                <Button
                  label="Editar"
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

export default EditListModal
