import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import AppContext from '../contexts/AppContext';
import Header from './Header';

const END = 12;

function Drinks() {
  const { drinks } = useContext(AppContext);

  return (
    <div>
      <Header title="Drinks" />
      {drinks.slice(0, END).map(({ strDrink, strDrinkThumb }, index) => (
        <Card
          style={ { width: '18rem' } }
          key={ strDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            src={ strDrinkThumb }
            variant="top"
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Text data-testid={ `${index}-card-name` }>{strDrink}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Drinks;
