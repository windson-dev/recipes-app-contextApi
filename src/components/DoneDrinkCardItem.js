import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneDrinkCardItem({
  alcoholicOrNot,
  category,
  doneDate,
  id,
  image,
  index,
  name,
}) {
  const [wasClicked, setWasClicked] = useState(false);
  const history = useHistory();

  function handleClick() {
    copy(`http://localhost:3000/drinks/${id}`);
    setWasClicked(true);
  }

  function handleRedirect() {
    history.push(`/drinks/${id}`);
  }

  return (
    <Card
      style={ { width: '18rem' } }
      key={ name }
    >
      <Card.Img
        src={ image }
        variant="top"
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => handleRedirect() }
      />
      <Card.Body>
        <Card.Text
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => handleRedirect() }
        >
          {name}
        </Card.Text>
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>{category}</Card.Text>
        <Card.Text
          data-testid={ `${index}-horizontal-top-text` }
        >
          {alcoholicOrNot}
        </Card.Text>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>{doneDate}</Card.Text>
        <input
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleClick }
          src={ shareIcon }
          type="image"
        />
      </Card.Body>
      {wasClicked && <span>Link copied!</span>}
    </Card>
  );
}

DoneDrinkCardItem.propTypes = {
  alcoholicOrNot: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  doneDate: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
};

export default DoneDrinkCardItem;
