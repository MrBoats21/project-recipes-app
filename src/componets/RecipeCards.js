import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';

function RecipeCards({ type }) {
  const { apiResponse } = useContext(recipeContext);

  const renderCards = () => {
    const cards = apiResponse.map((c, i) => {
      const idKey = type === 'foods' ? 'idMeal' : 'idDrink';
      const urlThumb = type === 'foods' ? 'strMealThumb' : 'strDrinkThumb';
      const name = type === 'foods' ? 'strMeal' : 'strDrink';

      return (
        <Link
          to={ `/${type}/${c[idKey]}` }
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

RecipeCards.propTypes = {
  type: Proptypes.string,
}.isRequired;

export default RecipeCards;
