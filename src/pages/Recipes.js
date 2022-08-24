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
      console.log(response, 'teste');
      setApiResponse(response.slice(0, lastItemIndex));
    };
    requestApi();
  }, [path, setApiResponse]);
  useEffect(() => {
    setMainLoading(false);
  }, [apiResponse, setMainLoading]);

  const foodOrDrink = () => {
    if (path === '/foods') return ('Foods');
    if (path === '/drinks') return ('Drinks');
  };

  return (
    <div>
      <Header title={ foodOrDrink() } />
      <Categories />
      { mainLoading && <Loading />}
      { !mainLoading && <RecipeCards type={ foodOrDrink().toLowerCase() } />}
      <Footer />

    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;

export default Recipes;
