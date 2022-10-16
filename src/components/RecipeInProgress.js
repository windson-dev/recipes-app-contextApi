import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const MAX_DRINK_INGREDIENTS = 16;
const MAX_MEAL_INGREDIENTS = 21;

function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const MAX_INGREDIENTS = pathname.includes('drinks')
    ? MAX_DRINK_INGREDIENTS
    : MAX_MEAL_INGREDIENTS;

  useEffect(() => {
    async function fetchApi() {
      const url = pathname.includes('drinks')
        ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (pathname.includes('drinks')) setRecipe(data.drinks.at(0));
      else setRecipe(data.meals.at(0));
    }

    fetchApi();
  }, [id, pathname]);

  const ingredientes = [];

  for (let i = 1; i < MAX_INGREDIENTS; i += 1) {
    if (recipe[`strIngredient${i}`]) ingredientes.push(recipe[`strIngredient${i}`]);
  }

  return (
    <>
      <img
        alt={ pathname.includes('drinks') ? recipe.strDrink : recipe.strMeal }
        data-testid="recipe-photo"
        src={ pathname.includes('drinks') ? recipe.strDrinkThumb : recipe.strMealThumb }
      />

      <h1 data-testid="recipe-title">
        { pathname.includes('drinks') ? recipe.strDrink : recipe.strMeal }
      </h1>

      <button data-testid="share-btn" type="button">Compartilhar</button>

      <button data-testid="favorite-btn" type="button">Favorito</button>

      <span data-testid="recipe-category">{ recipe.strCategory }</span>

      {ingredientes.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingredient-step` }
          key={ ingredient }
        >
          {ingredient}
          <input id={ `${index}-ingredient-step` } type="checkbox" />
        </label>
      ))}

      <p data-testid="instructions">{ recipe.strInstructions }</p>

      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </>
  );
}

export default RecipeInProgress;
