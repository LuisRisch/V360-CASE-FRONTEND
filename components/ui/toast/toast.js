/*
Copyright (C) 2021 Centro de Computacao Cientifica e Software Livre
Departamento de Informatica - Universidade Federal do Parana - C3SL/UFPR

This file is part of Frontend-Painel-pnld.

Frontend-Painel-pnld is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Frontend-Painel-pnld is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Frontend-Painel-pnld  If not, see <https://www.gnu.org/licenses/>.
*/

import React, { useContext } from 'react';
import styles from './toast.module.css';
import NotificationContext from '../../../context/notification-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import CheckImage from '../../../images/toast/check.svg'
// import ErrorImage from '../../../images/toast/error.svg';
// import WarningImage from '../../../images/toast/warning.svg';
// import InfoImage from '../../../images/toast/info.svg';

/*  Required props 
 * -title;
 * -message;
 * -status. */

const Toast = props => {
  const notificationCtx = useContext(NotificationContext);
  const { title, message, status } = props;

  return (
    <>
      <div className={`${styles.notification_container} ${styles.top_right}`} onClick={notificationCtx.hideNotification}>
        <div
          className={`${styles.notification} ${styles.toast} ${styles.top_right}`}
          style={
            status === 'success' ? { backgroundColor: 'var(--color-success)' } :
              status === 'error' ? { backgroundColor: 'var(--color-danger)' } :
                status === 'warning' ? { backgroundColor: 'var(--color-warning)' } :
                  { backgroundColor: 'var(--color-info)' }
          }
        >
          <button>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div>
            <p className={`${styles.notification_title}`}>
              {title}
            </p>
            <p className={`${styles.notification_message}`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toast;