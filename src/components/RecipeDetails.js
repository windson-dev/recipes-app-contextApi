import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  return (
    <div>
      {
        pathname === `/drinks/${id}` ? (
          <DrinksDetails />
        ) : (
          <MealsDetails />
        )
      }
    </div>
  );
}

export default RecipeDetails;
