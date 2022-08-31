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
        <div key={ c[idKey] } className="d-flex p-1">
          <Link
            to={ `${pathname}/${c[idKey]}` }
            data-testid={ `${i}-recipe-card` }
          >
            <img
              className="img-fluid"
              src={ c[urlThumb] }
              alt={ `Foto de ${c[name]}` }
              style={ { width: '200px' } }
              data-testid={ `${i}-card-img` }
            />
            <div className="text-center mt-3">
              <h3 data-testid={ `${i}-card-name` }>{ c[name] }</h3>
            </div>
          </Link>
        </div>
      );
    });
    return (cards);
  };
  return (
    <div className="d-flex justify-content-center flex-wrap">
      { renderCards() }
    </div>
  );
}

export default RecipeCards;
