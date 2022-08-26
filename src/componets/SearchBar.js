import React, { useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import recipeContext from '../contex/recipeContext';

function SearchBar() {
  const history = useHistory();
  const { setApiResponse } = useContext(recipeContext);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');
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
