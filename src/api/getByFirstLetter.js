const getByFirstLetter = async (pathname, firstLetter) => {
  try {
    const END_POINT_F = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const END_POINT_D = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    if (pathname === '/foods') {
      apiResponse = await fetch(END_POINT_F)
        .then((response) => response.json());
      return (apiResponse);
    } if (pathname === '/drinks') {
      apiResponse = await fetch(END_POINT_D)
        .then((response) => response.json());
      return (apiResponse);
    }
    throw new Error('Pathname inválido');
  } catch (error) {
    console.log(error.message);
  }
};

export default getByFirstLetter;
