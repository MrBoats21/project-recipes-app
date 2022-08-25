import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';

function RecipeCards() {
  const { location: { pathname } } = useHistory();
  const { apiResponse } = useContext(recipeContext);

  const renderCards = () => {
    const cards = apiResponse.map((c, i) => {
      const idKey = pathname === '/foods' ? 'idMeal' : 'idDrink';
      const urlThumb = pathname === '/foods' ? 'strMealThumb' : 'strDrinkThumb';
      const name = pathname === '/foods' ? 'strMeal' : 'strDrink';

      return (
        <Link
          to={ `${pathname}/${c[idKey]}` }
          key={ c[idKey] }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            src={ c[urlThumb] }
            alt={ `Foto de ${c[name]}` }
            style={ { width: '250px' } }
            data-testid={ `${i}-card-img` }
          />
          <h3 data-testid={ `${i}-card-name` }>{ c[name] }</h3>
        </Link>
      );
    });
    return (cards);
  };
  return (
    <div>
      { renderCards() }
    </div>
  );
}

export default RecipeCards;
