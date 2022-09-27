import React from 'react';
import propTypes from 'prop-types';

function Button({ category }) {
  return (
    <button
      data-testid={ `${category}-category-filter` }
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
