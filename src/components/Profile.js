import React from 'react';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  return (
    <div>
      <Header search={ null } title="Profile" />
      PERFIL:
      <Footer />
    </div>
  );
}

export default Profile;
