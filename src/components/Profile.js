import React from 'react';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const email = localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '';

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{email}</p>
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
