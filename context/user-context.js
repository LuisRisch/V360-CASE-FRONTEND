/*Copyright (C) 2021 Centro de Computacao Cientifica e Software Livre
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

import { createContext, useEffect, useState, useContext } from 'react';
import { api } from '../services/api';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import NotificationContext from './notification-context';

const UserContext = createContext({
  isLoggedIn: false,
  signIn: () => { },
  signOut: () => { },
  signUp: () => { }
});

export function UserContextProvider(props) {
  const notificationContext = useContext(NotificationContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      setIsLoggedIn(true);
    }
  }, [])

  async function signIn({ email, password }) {
    let notification = {};

    api.post('/auth/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.statusText === "OK") {
          const { token, userId } = response.data;

          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
          })

          api.defaults.headers['Authorization'] = `Bearer ${token}`;
          setIsLoggedIn(true);
          notification.title = 'Login realizado com sucesso!';
          notification.message = 'Bem vindo a lista TO DO!';
          notification.status = 'success';

          router.push('/');
        }
      })
      .catch((err) => {
        notification.title = 'Falha durante a autenticação';
        notification.status = 'warning';

        if (err.response.data.message)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';

        router.push('/login');
      })
      .finally(() => {
        notificationContext.showNotification(notification);
      })
  }

  async function signOut() {
    let notification = {};

    destroyCookie({}, 'nextauth.token');
    api.defaults.headers['Authorization'] = ``;
    setIsLoggedIn(false);
    notification.title = 'Logout realizado com sucesso!';
    notification.message = 'Até mais!';
    notification.status = 'success';
    notificationContext.showNotification(notification);
    router.push('/login');
  }

  async function signUp({ email, password, name }) {
    let notification = {};

    api.put('/auth/signup', {
      email,
      password,
      name
    })
      .then((response) => {
        if (response.statusText === "Created") {
          notification.title = 'Usuário criado com sucesso!';
          notification.message = response.data.message;
          notification.status = 'success';

          router.push('/login');
        }
      })
      .catch((err) => {
        notification.title = 'Falha durante a criação do usuário';
        notification.status = 'warning';

        if (err.response.data.message)
          notification.message = err.response.data.message;
        else
          notification.message = 'Ocorreu um erro desconhecido';

        router.push('/signup');
      })
      .finally(() => {
        notificationContext.showNotification(notification);
      })
  }

  const context = {
    isLoggedIn: isLoggedIn,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp,
  }

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;