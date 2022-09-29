import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, search }) {
  const [renderInput, setRenderInput] = useState(false);
  const history = useHistory();

  return (
    <header>
      <p data-testid="page-title">{ title }</p>
      <input
        type="image"
        alt="profile icon"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => history.push('/profile') }
      />

      { search === null ? null : (
        <input
          type="image"
          alt="search button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setRenderInput((prevState) => !prevState) }
        />
      )}
      { renderInput && (<SearchBar />)}

    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  search: string.isRequired,
};

export default Header;
