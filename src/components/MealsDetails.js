import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardDetails from './CardDetails';

function MealsDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchMeals() {
      if (pathname === `/meals/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        response.json().then((data) => {
          setRecipeDetails(data.meals[0]);
          setIsFetching(true);
        });
      }
    }
    fetchMeals();
  }, [id, pathname]);

  const getAllStrIngredients = Object.keys(recipeDetails)
    .filter((element) => element.includes('strIngredient'))
    .map((element, index) => (
      recipeDetails && (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <p>{recipeDetails[element]}</p>
        </div>)
    ));

  const getAllStrMeasures = Object.keys(recipeDetails)
    .filter((element) => element.includes('strMeasure'))
    .map((element, index) => (
      recipeDetails
    && (
      <div
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        <p>{recipeDetails[element]}</p>
      </div>
    )
    ));

  const { strMealThumb, strMeal, strCategory,
    strInstructions, strYoutube } = recipeDetails;

  return (
    !isFetching ? <p>Loading...</p> : (
      <CardDetails
        image={ strMealThumb }
        title={ strMeal }
        video={ strYoutube }
        ingredient={ getAllStrIngredients }
        measure={ getAllStrMeasures }
        instructions={ strInstructions }
        category={ strCategory }
      />
    )
  );
}

export default MealsDetails;
