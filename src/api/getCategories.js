const getCategories = async (pathname) => {
  try {
    const END_POINT_F = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const END_POINT_D = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    let apiResponse;

    if (pathname === '/foods') {
      apiResponse = await fetch(END_POINT_F)
        .then((response) => response.json());
      return (apiResponse.meals);
    } if (pathname === '/drinks') {
      apiResponse = await fetch(END_POINT_D)
        .then((response) => response.json());
      return (apiResponse.drinks);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default getCategories;
