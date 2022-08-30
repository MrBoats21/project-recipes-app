import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBtn, setSearchBtn] = useState(false);
  return (
    <header>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Ícone do perfil"
        />
      </Link>
      {(title !== 'Profile'
      && title !== 'Done Recipes'
      && title !== 'Favorite Recipes')
      && (
        <div>
          <button
            type="button"
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Ícone de pesquisa"
            onClick={ !searchBtn ? () => setSearchBtn(true) : () => setSearchBtn(false) }
          >
            <img src={ searchIcon } alt="Ícone de pesquisa" />
          </button>
          {searchBtn && <SearchBar />}

        </div>)}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
