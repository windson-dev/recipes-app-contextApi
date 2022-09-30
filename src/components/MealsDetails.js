import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import CardDetails from './CardDetails';
import './RecommendedCarousel.css';

function MealsDetails() {
  const { recommendedDrinks, setRecommendedDrinks } = useContext(AppContext);
  const [recipeDetails, setRecipeDetails] = useState({});

  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
  const isDone = doneRecipes.some((doneRecipe) => doneRecipe.id === id);

  const inProgressRecipes = JSON.parse(localStorage
    .getItem('inProgressRecipes')) ?? { drinks: {}, meals: {} };
  const isInProgress = Object.hasOwn(inProgressRecipes.meals, id);

  useEffect(() => {
    async function fetchMeals() {
      if (pathname === `/meals/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        response.json().then((data) => {
          setRecipeDetails(data.meals[0]);
        });
      }
    }
    fetchMeals();
  }, [id, pathname]);

  useEffect(() => {
    async function fetchRecommendedMeals() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      response.json().then((data) => {
        setRecommendedDrinks(data.drinks);
      });
    }
    fetchRecommendedMeals();
  }, [setRecommendedDrinks]);

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
  const maxRecommended = 6;

  return (
    <div>
      <CardDetails
        image={ strMealThumb }
        title={ strMeal }
        video={ strYoutube }
        ingredient={ getAllStrIngredients }
        measure={ getAllStrMeasures }
        instructions={ strInstructions }
        category={ strCategory }
      />
      <div className="container-fluid">
        <div className="row flex-row flex-nowrap overflow-auto">
          {recommendedDrinks
              && (recommendedDrinks.slice(0, maxRecommended)
                .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
                  <div
                    key={ idDrink }
                    data-testid={ `${index}-recommendation-card` }
                    style={ { width: '11rem' } }
                  >
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { strDrink }
                    </p>

                    <img
                      src={ strDrinkThumb }
                      alt={ strDrink }
                      className="card-img-top"
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
          onClick={ () => history.push(`/meals/${id}/in-progress`) }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default MealsDetails;
