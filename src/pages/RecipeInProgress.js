import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { receiverD, receiverF, checkStorage, favoritos } from '../helpers/functions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';
import getCurrentDate from '../helpers/getDate';

const copy = require('clipboard-copy');

function RecipeInProgress({ match }) {
  const [favorits, setFavorits] = useState({});
  const [done, setDone] = useState({
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: getCurrentDate('/'),
    tags: '',
  });
  const [initialLoad, setInitialLoad] = useState(true);
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
  const [disabled, setDisabled] = useState(true);
  const [copyed, setCopyed] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

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

  useEffect(() => {
    if (!initialLoad) {
      let key = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const changedKey = url.includes('foods') ? key.meals : key.cocktails;
      const keyName = url.includes('foods') ? 'meals' : 'cocktails';
      changedKey[recipeId] = usedIngredients;
      key = { ...key, [keyName]: changedKey };

      localStorage.setItem('inProgressRecipes', JSON.stringify(key));
    }
  }, [usedIngredients]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else {
      const doneLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneLocalStorage) {
        localStorage.setItem('doneRecipes', JSON.stringify([...doneLocalStorage, done]));
      } else { localStorage.setItem('doneRecipes', JSON.stringify([done])); }

      const key = pathname.includes('/foods') ? 'meals' : 'cocktails';
      const InProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const listByType = InProgress[key];
      delete listByType[recipeId];
      const newInProgress = { ...InProgress, [key]: listByType };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
      console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
      history.push('/done-recipes');
    }
  }, [done]);

  useEffect(() => {
    const verifyCheckboxes = () => {
      const iLength = usedIngredients.length;
      const boxList = receitaFood[0].ingre.length;
      if (iLength === boxList) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    verifyCheckboxes();
  }, [usedIngredients, receitaFood]);

  const setIngredientsList = (iName, { target }) => {
    if (target.checked) {
      setUsedIngredients([...usedIngredients, iName]);
    } else {
      setUsedIngredients([...usedIngredients.filter((item) => item !== iName)]);
    }
  };

  function finish() {
    if (tipo === 'foods') {
      receiverF(recipeId, () => {}, setDone, 'done');
    } else {
      receiverD(recipeId, () => {}, setDone, 'done');
    }
  }

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
            <img src={ iconShare } alt="img" />
            {copyed === true ? <p>Link copied!</p> : ''}
          </button>

          <button
            onClick={ () => favoritos(favorits, setIcons, favoritosAtivo, recipeId) }
            data-testid="favorite-btn"
            type="button"
            src={ icons }
          >
            <img alt="ico" src={ icons } />
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
                  value={ b }
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
        onClick={ () => finish() }
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
