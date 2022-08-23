const getByName = async (pathname, name) => {
  try {
    const END_POINT_FOODS = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const END_POINT_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    if (pathname === '/foods') {
      apiResponse = await fetch(END_POINT_FOODS)
        .then((response) => response.json());
      return (apiResponse);
    } if (pathname === '/drinks') {
      apiResponse = await fetch(END_POINT_DRINKS)
        .then((response) => response.json());
      return (apiResponse);
    }
    throw new Error('Pathname inválido');
  } catch (error) {
    console.log(error.message);
  }
};

export default getByName;
