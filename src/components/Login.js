import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(AppContext);
  const history = useHistory();

  const validateEmailAndPassword = () => {
    const isEmailValid = (email.includes('@')
        && (email.toLowerCase().includes('.com')));
    const lengthPassword = 7;
    const isPasswordValid = (password.length >= lengthPassword);
    return isEmailValid && isPasswordValid;
  };
  const isDisabled = validateEmailAndPassword();

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    history.push('/meals');
  };

  return (
    <>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ ({ target: { value: nameEmail } }) => setEmail(nameEmail) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target: { value: namePassword } }) => setPassword(namePassword) }

      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
