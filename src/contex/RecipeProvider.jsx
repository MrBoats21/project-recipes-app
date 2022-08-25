import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);
  return (
    <recipeContext.Provider
      value={ {
        apiResponse,
        setApiResponse,
        mainLoading,
        setMainLoading,

      } }
    >
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
