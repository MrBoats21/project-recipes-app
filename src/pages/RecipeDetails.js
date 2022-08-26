import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { drinks, favoritos, foods,
  recomenBebidas, recomenComidas } from '../api/foods';

function RecipeDetails({ match }) {
  const { params: { recipeId }, url } = match;
  const tipo = url.split('/')[1];
  const history = useHistory();
  const [favorits, setFavorits] = useState({});
  const [receitaFood, setReceitaFood] = useState([{
    img: '',
    titulo: '',
    cat: '',
    ingre: [],
    qtd: [],
    inst: '',
    video: '',
  }]);
  const [recomendacao, setRecomendacao] = useState([]);
  async function receiverF() {
    const recomend = await recomenBebidas();
    const result = await foods(recipeId);
    const ingr = Object.entries(result)
      .filter((a) => a[0].includes('strIngredient') && a[1] !== '');
    const instr = Object.entries(result)
      .filter((a) => a[0].includes('strMeasure') && a[1] !== '');
    console.log(result);
    setRecomendacao(recomend);
    setReceitaFood([{
      img: result.strMealThumb,
      titulo: result.strMeal,
      cat: result.strCategory,
      ingre: ingr.map((a) => a[1]),
      qtd: instr.map((a) => a[1]),
      inst: result.strInstructions,
      video: result.strYoutube,
    }]);
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
  useEffect(() => {
    async function receiverD() {
      const recomend = await recomenComidas();
      const result = await drinks(recipeId);
      setRecomendacao(recomend);
      const ingr = Object.entries(result)
        .filter((a) => a[0].includes('strIngredient') && a[1] !== null);
      const instr = Object.entries(result)
        .filter((a) => a[0].includes('strMeasure') && a[1] !== null);
      setReceitaFood([{
        img: result.strDrinkThumb,
        titulo: result.strDrink,
        cat: result.strAlcoholic,
        ingre: ingr.map((a) => a[1]),
        qtd: instr.map((a) => a[1]),
        inst: result.strInstructions,
      }]);
      setFavorits({
        id: result.idDrink,
        type: 'drink',
        nationality: result.strArea ? result.strArea : '',
        category: result.strCategory ? result.strCategory : '',
        alcoholicOrNot: result.strAlcoholic.includes('Alcoholic')
          ? 'Alcoholic' : 'non-Alcoholic',
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
          <button
            data-testid="share-btn"
            type="button"
          >
            compartilhar
          </button>
          <button
            onClick={ () => favoritos(favorits) }
            data-testid="favorite-btn"
            type="button"
          >
            favorito
          </button>
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
                {a.qtd[index]}
              </li>
            ))}
          </ol>
          <p
            data-testid="instructions"
          >
            {a.inst}
          </p>
          {tipo === 'foods'
            ? (
              <iframe
                data-testid="video"
                src={ a.video.replace('watch?v=', 'embed/') }
                width="560"
                height="315"
                title="YouTube video player"
              />
            )
            : ''}
        </div>
      ))}
      <div
        overflow-x="visible"
        style={ {
          width: '280px',
          overflowX: 'scroll',
          display: 'flex' } }
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
            <p>{tipo === 'foods' ? a.strAlcoholic : a.strCategory }</p>
          </div>
        ))}
      </div>
      <button
        onClick={ () => history.push(`/${tipo}/${recipeId}/in-progress`) }
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
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
