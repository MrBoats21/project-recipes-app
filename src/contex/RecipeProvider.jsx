import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);
  const [showMenuType, setShowMenuType] = useState('all');
  return (
    <recipeContext.Provider
      value={ {
        apiResponse,
        setApiResponse,
        mainLoading,
        setMainLoading,
        showMenuType,
        setShowMenuType,
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
