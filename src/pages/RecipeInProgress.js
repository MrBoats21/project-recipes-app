import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useUpdate from '../Hooks/useUpdate';
import { receiverD, receiverF, checkStorage } from '../helpers/functions';

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
  const [disabled, setDisabled] = useState([true]);
  const [copyed, setCopyed] = useState([false]);
  const history = useHistory();

  useEffect(() => {
    if (tipo === 'foods') {
      receiverF(recipeId, setReceitaFood);
    } else {
      receiverD(recipeId, setReceitaFood);
    }
  }, [recipeId, tipo]);

  useEffect(() => {
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

  useEffect(() => {
    const verifyCheckboxes = () => {
      const iLength = usedIngredients.length;
      const boxList = document.getElementsByClassName('checkboxes');
      if (iLength === boxList.length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    verifyCheckboxes();
  }, [usedIngredients]);

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
            onClick={ () => {
              copy(`http://localhost:3000/${tipo}/${recipeId}`);
              setCopyed(true);
            } }
          >
            Compartilhar
            {copyed === true ? <p>Link copied!</p> : ''}
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
                  className="checkboxes"
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
        onClick={ () => { history.push('/done-recipes'); } }
        disabled={ disabled }
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
