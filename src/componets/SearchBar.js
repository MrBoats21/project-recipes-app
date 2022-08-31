import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';
// import useUpdate from '../Hooks/useUpdate';

import { getbyIngredient, getByName, getByFirstLetter } from '../api';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;
  const { setApiResponse, setMainLoading } = useContext(recipeContext);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('name');

  useEffect(() => {
    if (searchType === 'first_letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [search, searchType]);

  const handleButton = async (type) => {
    let api;
    switch (type) {
    case 'name':
      api = await getByName(pathname, search);
      break;
    case 'ingredient':
      api = await getbyIngredient(pathname, search);
      break;
    case 'first_letter':
      api = await getByFirstLetter(pathname, search);
      break;
    default:
      break;
    }
    const maxLength = 12;
    if (api) {
      if (api.length === 1 && pathname === '/foods') {
        history.push(`${pathname}/${api[0].idMeal}`);
      } else if (api.length === 1 && pathname === '/drinks') {
        history.push(`${pathname}/${api[0].idDrink}`);
      } else if (api.length > maxLength) {
        api = api.slice(0, maxLength);
      }
      setMainLoading(true);
      setApiResponse(api);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <>
      <div
        style={ { width: '19rem' } }
        className="input-groups d-flex justify-content-center flex-column mt-2"
      >
        <input
          className="form-control mb-2"
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <div className="d-flex justify-content-between">
          <label htmlFor="name">
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="searchRadio"
              checked={ searchType === 'name' }
              onChange={ (event) => setSearchType(event.target.id) }
            />
            Nome
          </label>
          <label htmlFor="ingredient">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="searchRadio"
              checked={ searchType === 'ingredient' }
              onChange={ (event) => setSearchType(event.target.id) }
            />
            Ingrediente
          </label>
          <label htmlFor="first_letter">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first_letter"
              name="searchRadio"
              checked={ searchType === 'first_letter' }
              onChange={ (event) => setSearchType(event.target.id) }
            />
            Primiera Letra
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          // style={ { border: ' 1px solid #452009',
          //   width: '40%' } }
          style={ { backgroundColor: '#452009',
            color: 'white',
            width: '100%',
          } }
          className="btn rounded p-1 "
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleButton(searchType) }
        >
          Buscar
        </button>
      </div>
    </>
  );
}

export default SearchBar;
