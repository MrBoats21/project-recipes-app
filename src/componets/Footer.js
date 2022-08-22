import React from 'react';
import '../styles/footer.css';

import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const changePageBtn = (type) => {
    history.push(`/${type}`);
  };

  return (
    <footer data-testid="footer">
      <h1>Footer</h1>
      <button
        type="button"
        className="footerButton"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => changePageBtn('drinks') }
      >
        <img src={ drinkIcon } alt="Bebidas" />

      </button>

      <button
        type="button"
        className="footerButton"
        data-testid="food-bottom-btn"
        onClick={ () => changePageBtn('foods') }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Comidas" />
      </button>
    </footer>
  );
}

export default Footer;
