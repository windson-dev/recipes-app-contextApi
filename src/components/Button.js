import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import AppContext from '../contexts/AppContext';

function Button({ category }) {
  const {
    mealsCategory,
    setMealsCategory,
    drinksCategory,
    setDrinksCategory,
  } = useContext(AppContext);

  const { location: { pathname } } = useHistory();

  function handleClick() {
    if (pathname === '/drinks') {
      const value = category === drinksCategory ? 'All' : category;

      setDrinksCategory(value);
    } else {
      const value = category === mealsCategory ? 'All' : category;

      setMealsCategory(value);
    }
  }

  return (
    <button
      data-testid={ `${category}-category-filter` }
      onClick={ handleClick }
      type="button"
    >
      {category}
    </button>
  );
}

Button.propTypes = {
  category: propTypes.string.isRequired,
};

export default Button;
