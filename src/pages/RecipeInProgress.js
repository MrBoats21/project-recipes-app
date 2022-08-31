import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useUpdate from '../Hooks/useUpdate';
import { receiverD, receiverF, checkStorage, favoritos } from '../helpers/functions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress({ match }) {
  const [favorits, setFavorits] = useState({});
  const [icons, setIcons] = useState();
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

  const favoritosAtivo = (id) => {
    const response = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (response) {
      const r = response.some((a) => a.id === id);
      return r ? blackHeartIcon : whiteHeartIcon;
    }
    return whiteHeartIcon;
  };

  useEffect(() => {
    setIcons(favoritosAtivo(recipeId));

    if (tipo === 'foods') {
      receiverF(recipeId, setReceitaFood, setFavorits);
    } else {
      receiverD(recipeId, setReceitaFood, setFavorits);
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

  function finish() {
    history.push('/done-recipes');
    const doneRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  return (
    <div>
      { receitaFood.map((a, i) => (
        <div className="d-flex flex-column align-items-center" key={ i }>
          <img
            data-testid="recipe-photo"
            src={ a.img }
            alt={ a.titulo }
            width="300px"
          />
          <h2 data-testid="recipe-title">{a.titulo}</h2>
          <p data-testid="recipe-category">{a.cat}</p>
          <div className="mb-3">
            <button
              className="btn btn-warning mr-2"
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                copy(`http://localhost:3000/${tipo}/${recipeId}`);
                setCopyed(true);
              } }
            >
              <img src={ iconShare } alt="img" />
              {copyed === true ? <p>Link copied!</p> : ''}
            </button>
            <button
              className="btn btn-warning ml-2"
              onClick={ () => favoritos(favorits, setIcons, favoritosAtivo, recipeId) }
              data-testid="favorite-btn"
              type="button"
              src={ icons }
            >
              <img alt="ico" src={ icons } />
            </button>
          </div>

          <h4>Ingredients</h4>
          <div className="d-flex flex-column">
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
                  value={ b }
                  checked={ usedIngredients.includes(b) }
                  onChange={ (event) => setIngredientsList(b, event) }
                />
                {`${b} - ${a.qtd[index]}`}
              </label>
            ))}
          </div>
          <p
            className="text-justify px-4"
            data-testid="instructions"
          >
            {a.inst}
          </p>
        </div>
      ))}

      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-warning"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ finish }
          disabled={ disabled }
        >
          Finalizar receita
        </button>
      </div>
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
