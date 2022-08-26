import { drinks, foods } from '../api/foods';

export async function receiverF(id, callback) {
  const result = await foods(id);
  const ingr = Object.entries(result)
    .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
  const instr = Object.entries(result)
    .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);

  callback([{
    img: result.strMealThumb,
    titulo: result.strMeal,
    cat: result.strCategory,
    ingre: ingr.map((a) => a[1]),
    qtd: instr.map((a) => a[1]),
    inst: result.strInstructions,
  }]);
}

export async function receiverD(id, callback) {
  const result = await drinks(id);
  const ingr = Object.entries(result)
    .filter((a) => a[0].includes('strIngredient') && a[1] !== '' && a[1] !== null);
  const instr = Object.entries(result)
    .filter((a) => a[0].includes('strMeasure') && a[1] !== '' && a[1] !== null);
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
