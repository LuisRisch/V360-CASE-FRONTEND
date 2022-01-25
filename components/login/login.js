import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import styles from './login.module.css';
import LoginCard from '../cards/user-card/user-card.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../ui/text-input/text-input';
import Button from '../ui/button/button';
import UserContext from '../../context/user-context';

function Login() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetFields = () => {
    setEmail("");
    setPassword("");
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    resetFields();
    userContext.signIn({ email, password });
  }

  const goSignup = () => {
    router.push('/signup');
  }

  const CARD_HEADER =
    <>
      Fazer login
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faUser} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          htmlFor="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          htmlFor="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          label="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </>;
  const CARD_FOOTER =
    <>
      <div>
        <Button
          label="Cadastrar"
          type="button"
          icon={faUserPlus}
          onClick={goSignup}
        />
      </div>
      <div>
        <Button
          label="Entrar"
          type="submit"
          icon={faSignInAlt}
          onClick={onSubmit}
        />
      </div>
    </>

  return (
    <div className={styles.container}>
      <LoginCard
        cardHeader={CARD_HEADER}
        cardBody={CARD_BODY}
        cardFooter={CARD_FOOTER}
      />
    </div>
  )
}

export default Login
