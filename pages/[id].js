import SingleListComponent from '../components/single-list/single-list.js';
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import NotificationContext from '../context/notification-context';
import Error from '../components/error/error.js';

function SingleList(props) {
  const { success, data } = props;
  const notificationContext = useContext(NotificationContext);

  useEffect(() => {
    if (!success)
      notificationContext.showNotification({
        title: 'Falha ao carregar a lista',
        message: data.message,
        status: 'error',
      });
  }, [])

  if (!success)
    return <Error />

  return <SingleListComponent
    list={data.list}
  />
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  let props;

  await apiClient.get('/lists/' + id)
    .then((response) => {
      props = {
        success: response.statusText === "OK",
        data: response.data,
      }
    })
    .catch((err) => {
      if (err.response)
        props = {
          success: false,
          data: err.response.data,
        }
      else
        props = {
          success: false,
          data: {
            message: 'Ocorreu um erro desconhecido',
          }
        }
    })

  return {
    props: props
  }
}

export default SingleList
