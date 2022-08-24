import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../componets/Header';
import Footer from '../componets/Footer';

function Profile() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState();

  const getFromLocalStorage = () => {
    if (localStorage.length === 0) {
      setUserEmail('Email não definido');
    } else {
      const email = JSON.parse(localStorage.getItem('user'));
      setUserEmail(email.email);
    }
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  const logOff = () => {
    history.push('/');
    localStorage.clear();
  };

  const redirect = (target) => {
    if (target) {
      history.push(`/${target}`);
    } else {
      logOff();
    }
  };
  return (
    <div>
      <Header title="Profile" />

      <h3 data-testid="profile-email">{`${userEmail}`}</h3>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => { redirect('done-recipes'); } }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => { redirect('favorite-recipes'); } }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => { redirect(); } }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
