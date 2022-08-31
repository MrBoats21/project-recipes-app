import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/blackHeartIcon.svg';

export default function FoodListCards(props) {
  const { recipes, showMenuType, setRecipes, type } = props;
  const [recipeListType, setRecipeListType] = useState([{
    alcoholicOrNot: '',
    category: '',
    doneDate: '',
    id: '',
    image: '',
    name: '',
    nationality: '',
    tags: [],
    type: '',
  }]);
  const [isCopied, setIsCopied] = useState(0);
  const host = window.location.origin;
  useEffect(() => {
    if (recipes) {
      setRecipeListType(recipes.filter((recipe) => recipe.type !== showMenuType));
    }
  }, [recipes, showMenuType]);
  const removeItemStorage = (recipeItem) => {
    const newStorageList = recipes.filter((recipe) => recipe.id !== recipeItem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorageList));
    setRecipes(newStorageList);
  };
  const recipeCopied = (pathname, id) => {
    const limitTime = 2000;
    copy(`${host}/${pathname}s/${id}`);
    setIsCopied(id);
    setTimeout(() => {
      setIsCopied(0);
    }, limitTime);
  };

  if (recipes) {
    return (recipeListType.map((recipe, index) => (
      <div
        className="border col-12 my-1 rounded p-3 d-flex"
        style={ { boxShadow: '0px 2px 3px 0px #ffc107' } }
        key={ recipe.id }
      >
        <div className="p-0">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              className="img-fluid"
              style={ { width: '19rem' } }
              alt={ recipe.name }
              src={ recipe.image }
            />
          </Link>
        </div>
        <div className="pl-2 w-100">
          <span
            data-testid={ `${index}-horizontal-top-text` }
            className="text-secondary"
            style={ { fontSize: '1rem' } }
          >
            {recipe.type === 'food' ? recipe.nationality : recipe.alcoholicOrNot}
            {' '}
            -
            {' '}
            {recipe.category}
          </span>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          { type === 'done' && (
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate}</p>
          )}
          { type === 'done' && recipe.tags !== [] && recipe.tags.map((c) => (
            <li
              className="my-3"
              key={ c }
              data-testid={ `${index}-${c}-horizontal-tag` }
            >
              { c }
            </li>
          ))}
          <div className="w-100 d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-warning rounded-circle w-25"
              style={ { boxShadow: '0px 3px 1px 0px #212529' } }
              onClick={ () => recipeCopied(recipe.type, recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                className="img-fluid align-self-center"
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            <button
              type="button"
              className="btn btn-warning rounded-circle w-25"
              style={ { boxShadow: '0px 3px 1px 0px  #212529' } }
              onClick={ () => removeItemStorage(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                className="img-fluid align-self-center"
                src={ likeIcon }
                alt="like icon"
              />
            </button>
          </div>
          {isCopied === recipe.id ? (
            <div className="col-12 p-0 text-center mt-3">
              <p className="p-0 m-0">Link copied!</p>
            </div>
          ) : null}
        </div>
      </div>
    ))
    );
  }
  return ('');
}
