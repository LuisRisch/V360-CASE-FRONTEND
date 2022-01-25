import { useState } from 'react';
import Modal from '../modal/modal';
import Backdrop from '../backdrop/backdrop';
import styles from './add-list-modal.module.css';
import IconButton from '../ui/icon-button/icon-button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../ui/text-input/text-input';
import Button from '../ui/button/button';

/* Required props
 * --openAddListModal; 
 * --handleOpenAddListModal; 
 * --handleAddList. */

function AddListModal(props) {
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  const OPEN_ADD_LIST_MODAL = props.openAddListModal || false;
  const HANDLE_OPEN_ADD_LIST_MODAL = props.handleOpenAddListModal || function () { };
  const HANDLE_ADD_LIST = props.handleAddList || function () { };

  const resetFields = () => {
    setListTitle("");
    setListDescription("");
  }

  const handleChangeListTitle = (event) => {
    setListTitle(event.target.value);
  }

  const handleChangeListDescription = (event) => {
    setListDescription(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    HANDLE_ADD_LIST(listTitle, listDescription);
    HANDLE_OPEN_ADD_LIST_MODAL();
    resetFields();
  }

  return (
    <>
      {OPEN_ADD_LIST_MODAL && <Backdrop open={OPEN_ADD_LIST_MODAL} onClick={HANDLE_OPEN_ADD_LIST_MODAL} />}
      {OPEN_ADD_LIST_MODAL && (
        <Modal>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <div>
                Adicione uma nova lista
              </div>
              <div className={styles.modal_close}>
                <IconButton
                  icon={faTimes}
                  color="var(--light--black)"
                  onClick={HANDLE_OPEN_ADD_LIST_MODAL}
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
                  onClick={HANDLE_OPEN_ADD_LIST_MODAL}
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

export default AddListModal