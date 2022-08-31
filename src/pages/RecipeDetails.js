import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import iconShare from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { drinks, foods, recomenBebidas, recomenComidas } from '../api/foods';
import { doneRecipes, recipeProgress } from '../helpers/functions';

function RecipeDetails({ match }) {
  const {
    params: { recipeId },
    url,
  } = match;
  const tipo = url.split('/')[1];
  const history = useHistory();
  const [favorits, setFavorits] = useState({});
  const [icons, setIcons] = useState();
  const [isCopied, setCopied] = useState(false);
  const [receitaFood, setReceitaFood] = useState([
    {
      img: '',
      titulo: '',
      cat: '',
      ingre: [],
      qtd: [],
      inst: '',
      video: '',
    },
  ]);
  const [recomendacao, setRecomendacao] = useState([]);
  async function receiverF() {
    const recomend = await recomenBebidas();
    const result = await foods(recipeId);
    const ingr = Object.entries(result).filter(
      (a) => a[0].includes('strIngredient') && a[1] !== '',
    );
    const instr = Object.entries(result).filter(
      (a) => a[0].includes('strMeasure') && a[1] !== '',
    );
    setRecomendacao(recomend);
    setReceitaFood([
      {
        img: result.strMealThumb,
        titulo: result.strMeal,
        cat: result.strCategory,
        ingre: ingr.map((a) => a[1]),
        qtd: instr.map((a) => a[1]),
        inst: result.strInstructions,
        video: result.strYoutube,
      },
    ]);
    setFavorits({
      id: result.idMeal,
      type: 'food',
      nationality: result.strArea ? result.strArea : '',
      category: result.strCategory ? result.strCategory : '',
      alcoholicOrNot: '',
      name: result.strMeal,
      image: result.strMealThumb,
    });
  }
  function favoritosAtivo(id) {
    const response = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (response) {
      const r = response.some((a) => a.id === id);
      return r ? blackHeartIcon : whiteHeartIcon;
    }
    return whiteHeartIcon;
  }
  useEffect(() => {
    setIcons(favoritosAtivo(recipeId));
    async function receiverD() {
      const recomend = await recomenComidas();
      const result = await drinks(recipeId);
      setRecomendacao(recomend);
      const ingr = Object.entries(result).filter(
        (a) => a[0].includes('strIngredient') && a[1] !== null,
      );
      const instr = Object.entries(result).filter(
        (a) => a[0].includes('strMeasure') && a[1] !== null,
      );
      setReceitaFood([
        {
          img: result.strDrinkThumb,
          titulo: result.strDrink,
          cat: result.strAlcoholic,
          ingre: ingr.map((a) => a[1]),
          qtd: instr.map((a) => a[1]),
          inst: result.strInstructions,
        },
      ]);
      setFavorits({
        id: result.idDrink,
        type: 'drink',
        nationality: result.strArea ? result.strArea : '',
        category: result.strCategory ? result.strCategory : '',
        alcoholicOrNot: result.strAlcoholic.includes('Alcoholic')
          ? 'Alcoholic'
          : 'non-Alcoholic',
        name: result.strDrink,
        image: result.strDrinkThumb,
      });
    }
    if (tipo === 'foods') {
      receiverF();
    } else {
      receiverD();
    }
  }, [recipeId, tipo]);
  function Copied() {
    setCopied(true);
    copy(`http://localhost:3000${url}`);
  }

  function favoritos(payload) {
    const receitas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (receitas !== null) {
      const booleano = receitas.some((a) => a.id === payload.id);
      if (booleano) {
        const value = receitas.filter((a) => a.id !== payload.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(value));
        setIcons(favoritosAtivo(recipeId));
      } else {
        const p = [...receitas, payload];
        localStorage.setItem('favoriteRecipes', JSON.stringify(p));
        setIcons(favoritosAtivo(recipeId));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([payload]));
      setIcons(favoritosAtivo(recipeId));
    }
  }
  return (
    <div className="">
      {receitaFood.map((a, i) => (
        <div className="d-flex flex-column align-items-center" key={ i }>
          <img
            data-testid="recipe-photo"
            src={ a.img }
            alt={ a.titulo }
            width="300px"
          />
          <div className="my-3">
            <button
              className="btn btn-warning mr-2"
              data-testid="share-btn"
              type="button"
              onClick={ Copied }
            >
              <img src={ iconShare } alt="img" />
            </button>
            {isCopied ? <p>Link copied!</p> : ''}
            <button
              className="btn btn-warning ml-2"
              onClick={ () => favoritos(favorits) }
              data-testid="favorite-btn"
              type="button"
              src={ icons }
            >
              <img alt="ico" src={ icons } />
            </button>
          </div>
          <h4 data-testid="recipe-title">{a.titulo}</h4>
          <p data-testid="recipe-category">{a.cat}</p>
          <ol>
            {a.ingre.map((b, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {b}
                {' '}
                -
                {' '}
                { a.qtd[index] }
              </li>
            ))}
          </ol>
          <p className="text-justify px-4" data-testid="instructions">{a.inst}</p>
          {tipo === 'foods' ? (
            <iframe
              data-testid="video"
              src={ a.video.replace('watch?v=', 'embed/') }
              width="560"
              height="315"
              title="YouTube video player"
            />
          ) : (
            ''
          )}
        </div>
      ))}
      <div
        overflow-x="visible"
        style={ {
          width: '280px',
          overflowX: 'scroll',
          display: 'flex',
        } }
      >
        {recomendacao.map((a, i) => (
          <div
            style={ { margin: '20px' } }
            key={ i }
            data-testid={ `${i}-recomendation-card` }
          >
            <img
              src={ tipo === 'foods' ? a.strDrinkThumb : a.strMealThumb }
              width="100px"
              alt={ i }
            />
            <h4 data-testid={ `${i}-recomendation-title` }>
              {tipo === 'foods' ? a.strDrink : a.strMeal}
            </h4>
            <p>{tipo === 'foods' ? a.strAlcoholic : a.strCategory}</p>
          </div>
        ))}
      </div>

      {doneRecipes() ? (
        <button
          className="btn btn-warning"
          onClick={ () => history.push(`/${tipo}/${recipeId}/in-progress`) }
          type="button"
          style={ { position: 'fixed', bottom: '0px', right: 'opx' } }
          data-testid="start-recipe-btn"
        >
          {recipeProgress ? 'Continue Recipe' : 'start recipe' }
        </button>)
        : ''}
    </div>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
export default RecipeDetails;
