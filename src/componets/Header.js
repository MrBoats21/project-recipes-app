import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [searchBtn, setSearchBtn] = useState(false);
  return (
    <header
      style={ { backgroundColor: '#fdb400', boxShadow: '0px 4px 0px #452009' } }
      className="d-flex justify-content-around align-items-center py-4"
    >
      <div>
        <Link to="/profile">
          <img
            style={ { border: '2px solid #452009' } }
            className="img-fluid rounded-circle p-2"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Ícone do perfil"
          />
        </Link>
      </div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <div>
        {(title !== 'Profile'
      && title !== 'Done Recipes'
      && title !== 'Favorite Recipes')
      && (
        <div>
          <button
            type="button"
            className="btn"
            // style={ { border: '2px solid #452009' } }
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Ícone de pesquisa"
            onClick={ !searchBtn ? () => setSearchBtn(true) : () => setSearchBtn(false) }
          >
            <img src={ searchIcon } alt="Ícone de pesquisa" />
          </button>
          {searchBtn && (<input
            className="form-control"
            type="text"
            data-testid="search-input"
          />)}
        </div>)}
      </div>

    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
