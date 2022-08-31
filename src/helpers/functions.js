import { drinks, foods } from '../api/foods';
import getCurrentDate from './getDate';

export async function receiverF(id, callback, secondCallback, type = 'favorite') {
  const result = await foods(id);
  const ingr = Object.entries(result)
    .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
  const instr = Object.entries(result)
    .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);
  const secondFavorite = {
    id: result.idMeal,
    type: 'food',
    nationality: result.strArea ? result.strArea : '',
    category: result.strCategory ? result.strCategory : '',
    alcoholicOrNot: '',
    name: result.strMeal,
    image: result.strMealThumb,
  };
  const secondDone = {
    id: result.idMeal,
    type: 'food',
    nationality: result.strArea ? result.strArea : '',
    category: result.strCategory ? result.strCategory : '',
    alcoholicOrNot: '',
    name: result.strMeal,
    image: result.strMealThumb,
    doneDate: getCurrentDate('/'),
    tags: !result.strTags || result.strTags === '' ? [] : result.strTags.split(','),
  };
  callback([{
    img: result.strMealThumb,
    titulo: result.strMeal,
    cat: result.strCategory,
    ingre: ingr.map((a) => a[1]),
    qtd: instr.map((a) => a[1]),
    inst: result.strInstructions,
  }]);
  if (type === 'favorite') {
    secondCallback(secondFavorite);
  } else { secondCallback(secondDone); }
}

export async function receiverD(id, callback, secondCallback, type = 'favorite') {
  const result = await drinks(id);
  const ingr = Object.entries(result)
    .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
  const instr = Object.entries(result)
    .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);

  const secondFavorite = {
    id: result.idDrink,
    type: 'drink',
    nationality: result.strArea ? result.strArea : '',
    category: result.strCategory ? result.strCategory : '',
    alcoholicOrNot: result.strAlcoholic.includes('Alcoholic')
      ? 'Alcoholic' : 'non-Alcoholic',
    name: result.strDrink,
    image: result.strDrinkThumb,
  };
  const secondDone = {
    id: result.idDrink,
    type: 'drink',
    nationality: result.strArea ? result.strArea : '',
    category: result.strCategory ? result.strCategory : '',
    alcoholicOrNot: result.strAlcoholic.includes('Alcoholic')
      ? 'Alcoholic' : 'non-Alcoholic',
    name: result.strDrink,
    image: result.strDrinkThumb,
    doneDate: getCurrentDate('/'),
    tags: !result.strTags || result.strTags === '' ? [] : result.strTags.split(','),
  };
  if (type === 'favorite') {
    secondCallback(secondFavorite);
  } else { secondCallback(secondDone); }

  callback([{
    img: result.strDrinkThumb,
    titulo: result.strDrink,
    cat: result.strAlcoholic,
    ingre: ingr.map((a) => a[1]),
    qtd: instr.map((a) => a[1]),
    inst: result.strInstructions,
  }]);
}

export const checkStorage = () => {
  let key = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (key === null) {
    key = { cocktails: {}, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(key));
  }
};

export const favoritos = (payload, callback, secondCallback, id) => {
  const receitas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (receitas !== null) {
    const booleano = receitas.some((a) => a.id === payload.id);
    if (booleano) {
      const value = receitas.filter((a) => a.id !== payload.id);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(value));
      callback(secondCallback(id));
    } else {
      const p = [...receitas, payload];
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(p));
      callback(secondCallback(id));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([payload]));
    callback(secondCallback(id));
  }
};

export function doneRecipes(id, path) {
  const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const storageKey = path.includes('/foods') ? 'meals' : 'cocktails';
  if (doneStorage && doneStorage.some((c) => c.id === id)) {
    return ('done');
  }
  if (inProgressStorage && inProgressStorage[storageKey][id]) {
    return ('inProgress');
  }
  return ('notMade');
}

export function recipeProgress() {
  const recipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return !!recipe;
}
