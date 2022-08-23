import React from 'react';
import PropTypes from 'prop-types';

import Header from '../componets/Header';
import Footer from '../componets/Footer';

function Recipes({ location }) {
  const foodOrDrink = () => {
    const path = location.pathname;
    if (path === '/foods') return ('Foods');
    if (path === '/drinks') return ('Drinks');
  };
  return (
    <div>
      <Header title={ foodOrDrink() } />
      <Footer />

    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;

export default Recipes;
