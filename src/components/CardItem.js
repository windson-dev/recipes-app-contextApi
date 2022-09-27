import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CardItem({ id, index, pathname, str, strThumb }) {
  const history = useHistory();

  return (
    <Card
      style={ { width: '18rem' } }
      key={ str }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${pathname}/${id}`) }
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
  id: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
  pathname: propTypes.string.isRequired,
  str: propTypes.string.isRequired,
  strThumb: propTypes.string.isRequired,
};

export default CardItem;
