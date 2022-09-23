import React from 'react';

function SearchBar() {
  return (
    <>
      <input data-testid="search-input" type="text" />

      <label htmlFor="ingredient">
        ingredients:
        <input
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameSearch">
        nameSearch:
        <input
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLatter">
        firstLatter:
        <input
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </>
  );
}

export default SearchBar;
