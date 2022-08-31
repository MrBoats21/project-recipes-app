import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBtn, setSearchBtn] = useState(false);
  return (
    <header
      className="d-flex justify-content-around pl-2
      bg-warning py-3 align-items-center mb-2 flex-wrap"
    >
      <Link
        to="/profile"
        className="btn btn-warning rounded-circle"
      >
        <img
          style={ { width: '2rem', height: '2.5rem' } }
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Ícone do perfil"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {title !== 'Profile'
        && title !== 'Done Recipes'
        && title !== 'Favorite Recipes'
        && (
          <div>
            <button
              className="btn btn-warning rounded-circle"
              type="button"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Ícone de pesquisa"
              onClick={
                !searchBtn
                  ? () => setSearchBtn(true)
                  : () => setSearchBtn(false)
              }
            >
              <img
                style={ { width: '2rem', height: '2.5rem' } }
                src={ searchIcon }
                alt="Ícone de pesquisa"
              />
            </button>
          </div>
        )}
      {searchBtn && <SearchBar />}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
