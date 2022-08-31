import React, { useContext } from 'react';
import recipeContext from '../contex/recipeContext';

function TypeSelector() {
  const { setShowMenuType } = useContext(recipeContext);
  return (
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
  );
}

export default TypeSelector;
