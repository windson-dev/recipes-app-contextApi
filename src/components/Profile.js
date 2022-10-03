import React from 'react';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email" />
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
