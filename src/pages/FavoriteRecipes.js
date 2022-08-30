import React, { useEffect, useState } from 'react';
import Header from '../componets/Header';
import FavoriteFoods from '../componets/FavoriteFood';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [showMenuType, setShowMenuType] = useState('all');
  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  console.log(recipes);
  return (
    <section className="vh-100">
      <Header title="Favorite Recipes" />
      {/* Componentizar */}
      <div className="mt-3 pt-3">
        <div className="nav d-flex justify-content-around my-2">
          <button
            data-testid="filter-by-all-btn"
            className="btn btn-warning w-25"
            type="button"
            onClick={ () => setShowMenuType('all') }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            className="btn btn-warning w-25"
            type="button"
            onClick={ () => setShowMenuType('drink') }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            className="btn btn-warning w-25"
            type="button"
            onClick={ () => setShowMenuType('food') }
          >
            Drinks
          </button>
        </div>
        {/* Componentizar */}
        <div className="card-area container py-2 d-flex justify-content-center">
          <div className="row w-100">
            <FavoriteFoods
              recipes={ recipes }
              showMenuType={ showMenuType }
              setRecipes={ setRecipes }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavoriteRecipes;
