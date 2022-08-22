import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginEnable, setIsLoginEnable] = useState(false);

  const isEmailEnable = (emailTest) => /\S+@\S+\.\S+/.test(emailTest);
  const history = useHistory();

  useEffect(() => {
    const passwordVerification = () => {
      const limitPassword = 6;
      return password.length > limitPassword;
    };
    setIsLoginEnable(passwordVerification() && isEmailEnable(email));
  }, [email, password]);

  const setLocalStorage = () => localStorage.setItem('user', JSON.stringify({ email }));
  const setMealToken = () => localStorage.setItem('mealsToken', 1);
  const setcocktailsToken = () => localStorage.setItem('cocktailsToken', 1);

  return (
    <section>
      <label htmlFor="inputEmail">
        email
        <input
          data-testid="email-input"
          type="text"
          name="inputEmail"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="inputPassword">
        Password
        <input
          data-testid="password-input"
          type="email"
          name="inputPassword"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !isLoginEnable }
        onClick={ () => {
          setLocalStorage();
          setMealToken();
          setcocktailsToken();
          history.push('/foods');
        } }
      >
        Logar
      </button>
    </section>
  );
}

export default Login;
