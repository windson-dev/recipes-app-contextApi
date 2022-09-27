import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchMeals, fetchMealsCategories } from '../services/serviceAPI';

function Recipes() {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [allCategory, setAllCategory] = useState({});
  const END = 12;

  useEffect(() => {
    const mounted = true;
    fetchMeals()
      .then((items) => {
        if (mounted) {
          return setMealsRecipes(items);
        }
      });
  }, []);

  useEffect(() => {
    const mounted = true;
    fetchMealsCategories()
      .then((items) => {
        if (mounted) {
          return setAllCategory(items);
        }
      });
  }, []);

  return (
    <div>
      { mealsRecipes.meals
        ? mealsRecipes.meals.slice(0, END).map(({ strMeal, strMealThumb }, index) => (
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
        )) : null }
    </div>
  );
}

export default Recipes;
