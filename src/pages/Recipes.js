import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../componets/Header';
import Footer from '../componets/Footer';
import getInitialRecipes from '../api/getInitialRecipes';

function Recipes({ location }) {
  const path = location.pathname;
  useEffect(() => {
    const requestApi = async () => {
      const test = await getInitialRecipes(path);
      console.log(test);
    };
    requestApi();
  });
  const foodOrDrink = () => {
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
