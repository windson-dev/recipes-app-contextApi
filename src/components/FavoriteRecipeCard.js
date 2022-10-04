import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Card } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RenderFavoriteRecipeCard({
  image, name, pathname, index, alcoholicOrNot,
  nationality, removeFavoriteRecipe, category, id }) {
  const [wasClicked, setWasClicked] = useState(false);

  function handleClick() {
    copy(`http://localhost:3000/${pathname}s/${id}`);
    setWasClicked(true);
  }

  return (
    <Card
      style={ { width: '16rem' } }
    >
      <Link to={ `${pathname}s/${id}` }>
        <Card.Img
          src={ image }
          variant="top"
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />

        <Card.Text
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </Card.Text>
      </Link>
      <Card.Body>

        <Card.Text
          data-testid={ `${index}-horizontal-top-text` }
        >
          {!alcoholicOrNot ? `${nationality} - ${category}` : alcoholicOrNot}
        </Card.Text>
        <input
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleClick }
          src={ shareIcon }
          type="image"
        />
        <input
          alt="blackHeartIcon"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ removeFavoriteRecipe }
          src={ blackHeartIcon }
          type="image"
        />
      </Card.Body>
      {wasClicked && <span>Link copied!</span>}
    </Card>
  );
}

RenderFavoriteRecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeFavoriteRecipe: PropTypes.func.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default RenderFavoriteRecipeCard;
