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

export function favoritos(payload) {
  console.log(payload);
  const receitas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(receitas);
  if (receitas !== null) {
    const dados = [...receitas, payload];
    localStorage.setItem('favoriteRecipes', JSON.stringify(dados));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([payload]));
  }
}
