import React from 'react';
import '../styles/footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <h1>Footer</h1>
      <button
        type="button"
        className="footerButton"
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="Bebidas" />

      </button>

      <button
        type="button"
        className="footerButton"
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="Comidas" />
      </button>
    </footer>
  );
}

export default Footer;
