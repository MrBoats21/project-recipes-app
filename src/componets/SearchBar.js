import React, { useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';

import { getbyIngredient, getByName, getByFirstLetter } from '../api';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;
  const { setApiResponse } = useContext(recipeContext);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    const getApi = async (searchType) => {
      switch (searchType) {
      case 'name': {
        const api = await getByName(pathname, search);
        return (api);
      }
      case 'Ingredient': {
        const api = await getbyIngredient(pathname, search);
        return (api);
      }
      case 'first_letter': {
        const api = await getByFirstLetter(pathname, search);
        return (api);
      }
      default:
        break;
      }
    };
    setApiResponse(getApi);
  }, [search, pathname, setApiResponse]);

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        value={ search }
        onChange={ (event) => setSearch(event.target.value) }
      />
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="searchRadio"
          onChange={ (event) => setSearchType(event.target.id) }
        />
        Nome
      </label>

      <label htmlFor="Ingredient">
        <input
          type="radio"
          id="Ingredient"
          name="searchRadio"
          onChange={ (event) => setSearchType(event.target.id) }
        />
        Ingrediente
      </label>

      <label htmlFor="first_letter">
        <input
          type="radio"
          id="first_letter"
          name="searchRadio"
          onChange={ (event) => setSearchType(event.target.id) }
        />
        Primiera Letra
      </label>
    </>
  );
}

export default SearchBar;
