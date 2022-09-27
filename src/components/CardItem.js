import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CardItem({ index, str, strThumb }) {
  return (
    <Card
      style={ { width: '18rem' } }
      key={ str }
      data-testid={ `${index}-recipe-card` }
    >
      <Card.Img
        src={ strThumb }
        variant="top"
        alt={ str }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Text data-testid={ `${index}-card-name` }>{str}</Card.Text>
      </Card.Body>
    </Card>
  );
}

CardItem.propTypes = {
  index: propTypes.number.isRequired,
  str: propTypes.string.isRequired,
  strThumb: propTypes.string.isRequired,
};

export default CardItem;
