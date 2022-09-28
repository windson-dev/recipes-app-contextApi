import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardDetails from './CardDetails';

function DrinksDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchDrinks() {
      if (pathname === `/drinks/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        response.json().then((data) => {
          setRecipeDetails(data.drinks[0]);
          setIsFetching(true);
        });
      }
    }
    fetchDrinks();
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

  const { strDrinkThumb, strDrink,
    strInstructions, strYoutube, strAlcoholic } = recipeDetails;

  return (
    !isFetching ? <p>Loading...</p> : (
      <CardDetails
        image={ strDrinkThumb }
        title={ strDrink }
        video={ strYoutube }
        ingredient={ getAllStrIngredients }
        measure={ getAllStrMeasures }
        instructions={ strInstructions }
        category={ strAlcoholic }
      />
    )
  );
}

export default DrinksDetails;
