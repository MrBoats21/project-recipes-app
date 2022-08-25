import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Header from '../componets/Header';
import Footer from '../componets/Footer';
import RecipeCards from '../componets/RecipeCards';
import Loading from '../componets/Loading';
import getInitialRecipes from '../api/getInitialRecipes';
import Categories from '../componets/Categories';

import recipeContext from '../contex/recipeContext';

function Recipes({ history }) {
  const path = history.location.pathname;

  const {
    apiResponse,
    setApiResponse,
    mainLoading,
    setMainLoading,
  } = useContext(recipeContext);

  useEffect(() => {
    const requestApi = async () => {
      const lastItemIndex = 12;
      const response = await getInitialRecipes(path);
      setApiResponse(response.slice(0, lastItemIndex));
    };
    requestApi();
  }, [path, setApiResponse]);
  useEffect(() => {
    setMainLoading(false);
  }, [apiResponse, setMainLoading]);

  return (
    <div>
      { path === '/foods' && <Header title="Foods" /> }
      { path === '/drinks' && <Header title="Drinks" /> }
      <Categories />
      { mainLoading && <Loading />}
      { !mainLoading && <RecipeCards />}
      <Footer />

    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;

export default Recipes;
