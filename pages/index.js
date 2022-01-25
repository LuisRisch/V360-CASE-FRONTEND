import HomeComponent from "../components/home/home";
import { parseCookies } from "nookies";
import { getAPIClient } from '../services/axios';
import NotificationContext from "../context/notification-context";
import { useContext, useEffect } from "react";
import Error from "../components/error/error";

export default function Home(props) {
  const notificationContext = useContext(NotificationContext);
  const { success, data } = props;

  useEffect(() => {
    if (!success)
      notificationContext.showNotification({
        title: 'Falha ao carregar a lista',
        message: data.message,
        status: 'error',   
      })
  }, [])

  if (!success)
    return <Error />

  return <HomeComponent
    lists={data.lists}
    totalItems={data.total}
  />;
}

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);
  let props;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  await apiClient.get('/lists')
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
    props: props,
  }
}