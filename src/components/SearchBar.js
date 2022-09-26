import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchApi from '../services/serviceAPI';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [state, setState] = useState({ input: '', search: '' });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleClick() {
    if (state.input.length > 1 && state.search === 'f') {
      global.alert('Your search must have only 1 (one) character');

      return;
    }

    const data = await fetchApi(state.input, state.search, pathname);

    if (data[pathname.slice(1)].length === 1) {
      if (pathname === '/meals') {
        history.push(`/meals/${data.meals[0].idMeal}`);

        return;
      }

      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
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
