import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const recipeDetailsContext = createContext();

export default function RecipeDetailsProvider({ children }) {
  const [recipeDetails, setRecipeDetails] = useState([]);

  return (
    <recipeDetailsContext.Provider value={ { recipeDetails, setRecipeDetails } }>
      {children}
    </recipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
