import React, { useContext, useState, useEffect } from 'react';
import Header from '../componets/Header';
import TypeSelector from '../componets/TypeSelector';
import FoodListCards from '../componets/FoodListCards';

import recipeContext from '../contex/recipeContext';

function DoneRecipes() {
  const {
    showMenuType,
    setShowMenuType,
  } = useContext(recipeContext);
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(storage);
    setShowMenuType('all');
  }, []);
  return (
    <div>
      <Header title="Done Recipes" />
      <TypeSelector />
      <FoodListCards
        recipes={ recipes }
        showMenuType={ showMenuType }
        setRecipes={ setRecipes }
        type="done"
      />

    </div>
  );
}

export default DoneRecipes;
