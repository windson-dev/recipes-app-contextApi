import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState();
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchDrinksAndMeals() {
      if (pathname === `/meals/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = response.json();
        setRecipeDetails(data);
      }
      if (pathname === `/drinks/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = response.json();
        setRecipeDetails(data);
      }
    }
    fetchDrinksAndMeals();
  }, [id, pathname]);

  return (
    <div>
      recipes
    </div>
  );
}

export default RecipeDetails;
