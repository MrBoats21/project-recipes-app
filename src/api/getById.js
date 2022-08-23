const getById = async (pathname, id) => {
  try {
    const END_POINT_FOODS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const END_POINT_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (pathname.includes('/foods')) {
      apiResponse = await fetch(END_POINT_FOODS)
        .then((response) => response.json());
      return (apiResponse);
    } if (pathname.includes('/drinks')) {
      apiResponse = await fetch(END_POINT_DRINKS)
        .then((response) => response.json());
      return (apiResponse);
    }
    throw new Error('Pathname inválido');
  } catch (error) {
    console.log(error.message);
  }
};

export default getById;
