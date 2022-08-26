import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import foodLogo from '../images/goodFoodLogo.png';

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
    <section className="vh-100 d-flex flex-column justify-content-center">
      <div>
        <img
          className="img-fluid"
          alt="Good Food Logo"
          src={ foodLogo }
        />
      </div>
      <div className="w-100 justify-content-center input-group">
        <label
          htmlFor="inputEmail"
          className="d-flex flex-column justify-content-center"
        >
          Email
          <input
            className="form-control w-100"
            data-testid="email-input"
            type="text"
            name="inputEmail"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label
          htmlFor="inputPassword"
          className="d-flex flex-column justify-content-center"
        >
          Password
          <input
            className="form-control text-muted"
            data-testid="password-input"
            type="email"
            name="inputPassword"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>
      <button
        className="w-50 align-self-center mt-2
        btn bg-warning rounded text-body font-weight-bold"
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
        LOGAR
      </button>
    </section>
  );
}

export default Login;

// ref da imagem do logo https://similarpng.com/good-food-logo-design-on-transparent-background-png/#getdownload
