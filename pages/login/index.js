import LoginComponent from "../../components/login/login.js";
import { parseCookies } from "nookies";

function Login() {
  return <LoginComponent />;
}

export const getServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default Login
