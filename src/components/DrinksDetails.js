import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import CardDetails from './CardDetails';
import './RecommendedCarousel.css';

function DrinksDetails() {
  const { recommendedMeals, setRecommendedMeals } = useContext(AppContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
  const isDone = doneRecipes.some((doneRecipe) => doneRecipe.id === id);

  const inProgressRecipes = JSON.parse(localStorage
    .getItem('inProgressRecipes')) ?? { drinks: {}, meals: {} };
  const isInProgress = Object.hasOwn(inProgressRecipes.drinks, id);

  useEffect(() => {
    async function fetchDrinks() {
      if (pathname === `/drinks/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        response.json().then((data) => {
          setRecipeDetails(data.drinks[0]);
        });
      }
    }
    fetchDrinks();
  }, [id, pathname]);

  useEffect(() => {
    async function fetchRecommendedMeals() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      response.json().then((data) => {
        setRecommendedMeals(data.meals);
      });
    }
    fetchRecommendedMeals();
  }, [setRecommendedMeals]);

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
  console.log(recommendedMeals);

  const maxRecommended = 6;
  return (
    <div>
      <CardDetails
        image={ strDrinkThumb }
        title={ strDrink }
        video={ strYoutube }
        ingredient={ getAllStrIngredients }
        measure={ getAllStrMeasures }
        instructions={ strInstructions }
        category={ strAlcoholic }
      />

      <div className="container-fluid">
        <div className="row flex-row flex-nowrap overflow-auto">
          {recommendedMeals
              && (recommendedMeals.slice(0, maxRecommended)
                .map(({ strMealThumb, strMeal, idMeal }, index) => (
                  <div
                    key={ idMeal }
                    style={ { width: '11rem' } }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { strMeal }
                    </p>
                    <img
                      className="card-img-top"
                      src={ strMealThumb }
                      alt={ strMeal }
                    />
                  </div>
                )))}
        </div>
      </div>
      {!isDone && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default DrinksDetails;
