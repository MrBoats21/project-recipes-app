import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinks, foods } from '../api/foods';
import useUpdate from '../Hooks/useUpdate';

const copy = require('clipboard-copy');

function RecipeInProgress({ match }) {
  const { params: { recipeId }, url } = match;
  const tipo = url.split('/')[1];
  const [receitaFood, setReceitaFood] = useState([{
    img: '',
    titulo: '',
    cat: '',
    ingre: [],
    qtd: [],
    inst: '',
  }]);
  const [usedIngredients, setUsedIngredients] = useState([]);

  useEffect(() => {
    async function receiverF() {
      const result = await foods(recipeId);
      const ingr = Object.entries(result)
        .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
      const instr = Object.entries(result)
        .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);

      setReceitaFood([{
        img: result.strMealThumb,
        titulo: result.strMeal,
        cat: result.strCategory,
        ingre: ingr.map((a) => a[1]),
        qtd: instr.map((a) => a[1]),
        inst: result.strInstructions,
      }]);
    }
    async function receiverD() {
      const result = await drinks(recipeId);
      const ingr = Object.entries(result)
        .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
      const instr = Object.entries(result)
        .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);
      setReceitaFood([{
        img: result.strDrinkThumb,
        titulo: result.strDrink,
        cat: result.strAlcoholic,
        ingre: ingr.map((a) => a[1]),
        qtd: instr.map((a) => a[1]),
        inst: result.strInstructions,
      }]);
    }
    if (tipo === 'foods') {
      receiverF();
    } else {
      receiverD();
    }
  }, [recipeId, tipo]);

  useEffect(() => {
    const checkStorage = () => {
      let key = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (key === null) {
        key = { cocktails: {}, meals: {} };
        localStorage.setItem('inProgressRecipes', JSON.stringify(key));
      }
    };
    checkStorage();
  }, []);

  useEffect(() => {
    const getStorage = () => {
      const key = url.includes('food') ? 'meals' : 'cocktails';
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))[key];
      setUsedIngredients(storage[recipeId] ? storage[recipeId] : []);
    };
    getStorage();
  }, [recipeId, url]);

  useUpdate(() => {
    const setStorage = () => {
      let key = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const changedKey = url.includes('foods') ? key.meals : key.cocktails;
      const keyName = url.includes('foods') ? 'meals' : 'cocktails';
      changedKey[recipeId] = usedIngredients;
      key = { ...key, [keyName]: changedKey };

      localStorage.setItem('inProgressRecipes', JSON.stringify(key));
    };
    setStorage();
  }, [usedIngredients, recipeId, url]);

  const setIngredientsList = (iName, { target }) => {
    if (target.checked) {
      setUsedIngredients([...usedIngredients, iName]);
    } else {
      setUsedIngredients([...usedIngredients.filter((item) => item !== iName)]);
    }
  };

  return (
    <div>
      { receitaFood.map((a, i) => (
        <div key={ i }>
          <img
            data-testid="recipe-photo"
            src={ a.img }
            alt={ a.titulo }
            width="300px"
          />
          <h2 data-testid="recipe-title">{a.titulo}</h2>
          <p data-testid="recipe-category">{a.cat}</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => { copy(`http://localhost:3000${url}`); } }
          >
            Compartilhar
          </button>

          <button
            data-testid="favorite-btn"
            type="button"
          >
            Favoritar
          </button>
          <h4>Ingredients</h4>
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            {a.ingre.map((b, index) => (
              <label
                key={ index }
                htmlFor={ b }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  key={ index }
                  type="checkbox"
                  value={ { b } }
                  checked={ usedIngredients.includes(b) }
                  onChange={ (event) => setIngredientsList(b, event) }
                />
                {`${b} - ${a.qtd[index]}`}
              </label>
            ))}
          </div>
          <p
            data-testid="instructions"
          >
            {a.inst}
          </p>
        </div>
      ))}

      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
