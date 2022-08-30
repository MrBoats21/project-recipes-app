const getbyIngredient = async (pathname, ingredient) => {
  try {
    const END_POINT_F = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const END_POINT_D = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    let apiResponse;
    if (pathname === '/foods') {
      apiResponse = await fetch(END_POINT_F)
        .then((response) => response.json());
      return (apiResponse.meals);
    } if (pathname === '/drinks') {
      apiResponse = await fetch(END_POINT_D)
        .then((response) => response.json());
      console.log(apiResponse);
      return (apiResponse.drinks);
    }
    throw new Error('Pathname inválido');
  } catch (error) {
    console.log(error.message);
  }
};

export default getbyIngredient;
