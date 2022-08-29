// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

const endFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const endDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const recBebidas = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const recComeidas = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export async function foods(recipeId) {
  const result = await fetch(`${endFoods}${recipeId}`)
    .then((Response) => Response.json());
  return result.meals[0];
}

export async function drinks(recipeId) {
  const result = await fetch(`${endDrinks}${recipeId}`)
    .then((Response) => Response.json());
  return result.drinks[0];
}

export async function recomenBebidas() {
  const recomendacao = [];
  const six = 6;
  const result = await fetch(`${recBebidas}`)
    .then((response) => response.json());
  for (let index = 0; index < six; index += 1) {
    recomendacao.push(result.drinks[index]);
  }
  return recomendacao;
}

export async function recomenComidas() {
  const recomendacao = [];
  const six = 6;
  const result = await fetch(`${recComeidas}`)
    .then((response) => response.json());
  for (let index = 0; index < six; index += 1) {
    recomendacao.push(result.meals[index]);
  }
  return recomendacao;
}

// export function favoritosAtivo(id) {
//   const response = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   if (response) {
//     const r = response.some((a) => a.id === id);
//     console.log(r ? blackHeartIcon : whiteHeartIcon);
//     return r ? blackHeartIcon : whiteHeartIcon;
//   } return whiteHeartIcon;
// }

// export function favoritos(payload) {
//   const receitas = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   if (receitas !== null) {
//     const booleano = receitas.some((a) => a.id === payload.id);
//     console.log(booleano);
//     if (booleano) {
//       const value = receitas.filter((a) => a.id !== payload.id);
//       return localStorage.setItem('favoriteRecipes',
//         JSON.stringify(value));
//     }
//     const p = [...receitas, payload];
//     return localStorage.setItem('favoriteRecipes',
//       JSON.stringify(p));
//   }
//   localStorage.setItem('favoriteRecipes', JSON.stringify([payload]));
//   favoritosAtivo(payload.id);
//   console.log(favoritosAtivo(payload.id));
// }
