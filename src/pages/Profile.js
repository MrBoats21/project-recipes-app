import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../componets/Header';
import Footer from '../componets/Footer';

function Profile() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState();

  const getFromLocalStorage = () => {
    if (localStorage.length === 0) {
      setUserEmail('E-mail não definido');
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
    <>
      <Header title="Profile" />
      <h3 className="text-center mt-5" data-testid="profile-email">{`${userEmail}`}</h3>
      <div
        className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5"
      >
        <button
          className="btn btn-warning"
          style={ { width: '10rem' } }
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { redirect('done-recipes'); } }
        >
          Done Recipes
        </button>

        <button
          className="btn btn-warning my-3"
          style={ { width: '10rem' } }
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { redirect('favorite-recipes'); } }
        >
          Favorite Recipes
        </button>

        <button
          className="btn btn-warning"
          style={ { width: '10rem' } }
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { redirect(); } }
        >
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

export default Profile;
