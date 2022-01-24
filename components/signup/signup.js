import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './signup.module.css';
import SignupCard from '../cards/user-card/user-card.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../ui/text-input/text-input';
import Button from '../ui/button/button';


function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(name, email, password, confirmPassword);
  }

  const goLogin = () => {
    router.push('/login');
  }

  const CARD_HEADER =
    <>
      Criar conta
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faUserPlus} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      <Input
        type="text"
        htmlFor="name"
        id="name"
        name="name"
        placeholder="Digite seu nome"
        label="Nome"
        value={name}
        onChange={handleNameChange}
      />
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
      <Input
        type="password"
        htmlFor="confirmPassword"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Digite sua senha"
        label="Confirme sua senha"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
    </>;
  const CARD_FOOTER =
    <>
      <div>
        <Button
          label="Entrar"
          type="button"
          icon={faSignInAlt}
          onClick={goLogin}
        />
      </div>
      <div>
        <Button
          label="Cadastrar"
          type="button"
          icon={faUserPlus}
          onClick={onSubmit}
        />
      </div>
    </>

  return (
    <div className={styles.container}>
      <SignupCard
        cardHeader={CARD_HEADER}
        cardBody={CARD_BODY}
        cardFooter={CARD_FOOTER}
      />
    </div>
  )
}

export default Signup
