import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneMealCardItem({
  category,
  doneDate,
  id,
  index,
  name,
  nationality,
  image,
  tags,
}) {
  const [wasClicked, setWasClicked] = useState(false);
  const history = useHistory();

  function handleClick() {
    copy(`http://localhost:3000/meals/${id}`);
    setWasClicked(true);
  }

  function handleRedirect() {
    history.push(`/meals/${id}`);
  }

  return (
    <Card
      style={ { width: '16rem' } }
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
        <Card.Text
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${nationality} - ${category}`}
        </Card.Text>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>{doneDate}</Card.Text>
        {tags.slice(0, 2).map((tag) => (
          <Card.Text
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ tag }
          >
            {tag}
          </Card.Text>
        ))}
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

DoneMealCardItem.propTypes = {
  category: propTypes.string.isRequired,
  doneDate: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  nationality: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  tags: propTypes.arrayOf(propTypes.string).isRequired,
};

export default DoneMealCardItem;
