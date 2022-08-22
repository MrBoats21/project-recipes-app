import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';

export default function Drinks({ location: { pathname } }) {
  return (
    <div>
      {pathname === '/drinks' && <Header title="Drinks" />}
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({}),
}.isRequired;
