import React from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  return (
    <recipeContext.Provider>
      { children }
    </recipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
