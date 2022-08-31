import React, { useEffect, useState, useContext } from 'react';
import Header from '../componets/Header';
import FoodListCards from '../componets/FoodListCards';
import TypeSelector from '../componets/TypeSelector';
import recipeContext from '../contex/recipeContext';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState();
  const { showMenuType, setShowMenuType } = useContext(recipeContext);
  useEffect(() => {
    setShowMenuType('all');
    setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [setShowMenuType]);

  return (
    <section className="vh-100">
      <Header title="Favorite Recipes" />
      <div className="mt-3 pt-3">
        <TypeSelector />
        <div className="card-area container py-2 d-flex justify-content-center">
          <div className="row w-100">
            <FoodListCards
              recipes={ recipes }
              showMenuType={ showMenuType }
              setRecipes={ setRecipes }
              type="favorite"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavoriteRecipes;
