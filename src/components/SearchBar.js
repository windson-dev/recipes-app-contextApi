import React, { useState } from 'react';
import fetchApi from '../services/serviceAPI';

function SearchBar() {
  const [state, setState] = useState({ input: '', search: '' });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleClick() {
    if (state.input.length > 1 && state.search === 'f') {
      global.alert('Your search must have only 1 (one) character');

      return;
    }

    const data = await fetchApi(state.input, state.search);

    console.log(data);
  }

  return (
    <>
      <input
        value={ state.input }
        name="input"
        onChange={ handleChange }
        data-testid="search-input"
        type="text"
      />

      <label htmlFor="ingredient">
        ingredients:
        <input
          name="search"
          value="i"
          onChange={ handleChange }
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameSearch">
        nameSearch:
        <input
          name="search"
          value="s"
          onChange={ handleChange }
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLatter">
        firstLatter:
        <input
          name="search"
          value="f"
          onChange={ handleChange }
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </>
  );
}

export default SearchBar;
