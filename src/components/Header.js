import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  return (
    <div>
      { title }
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="icone de perfil"
        />
      </button>

      { search === null ? null : (
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <img
            src={ searchIcon }
            alt="icone de pesquisa"
          />
        </button>
      )}

    </div>
  );
}

export default Header;
