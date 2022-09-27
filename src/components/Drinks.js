import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
// import AppContext from '../contexts/AppContext';
import { fetchDrinks } from '../services/serviceAPI';
import Header from './Header';
// import Recipes from './Recipes';

const END = 12;

function Drinks() {
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  // const { drinks } = useContext(AppContext);

  useEffect(() => {
    const mounted = true;
    fetchDrinks()
      .then((items) => {
        if (mounted) {
          return setDrinksRecipes(items);
        }
      });
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      {drinksRecipes.drinks
        ? drinksRecipes.drinks.slice(0, END).map(({ strDrink, strDrinkThumb }, index) => (
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
        )) : null}
    </div>
  );
}

export default Drinks;
