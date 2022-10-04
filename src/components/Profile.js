import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const history = useHistory();
  const email = localStorage
    .getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : 'E-mail não informado';

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        type="button"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
        type="button"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
