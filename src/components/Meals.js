import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

const END = 12;

function Meals() {
  const { meals } = useContext(AppContext);

  return (
    <div>
      <Header title="Meals" />
      {meals.slice(0, END).map(({ strMeal, strMealThumb }, index) => (
        <Card
          style={ { width: '18rem' } }
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            src={ strMealThumb }
            variant="top"
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Text data-testid={ `${index}-card-name` }>{strMeal}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Recipes />
    </div>
  );
}

export default Meals;
