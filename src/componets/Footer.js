import React, { useContext } from 'react';
import '../styles/footer.css';

import { useHistory } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { setMainLoading } = useContext(recipeContext);

  const changePageBtn = (type) => {
    const { pathname } = history.location;
    if (!pathname.includes(type)) {
      setMainLoading(true);
    }
    history.push(`/${type}`);
  };

  return (
    <footer data-testid="footer">
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
