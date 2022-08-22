import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';

function Recipes({ location }) {
  return (
    <div>
      {location.pathname === '/foods' && <Header title="Foods" />}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
