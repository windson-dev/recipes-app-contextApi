/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import useDidUpdate from '../hooks/useDidUpdate';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const MAX_DRINK_INGREDIENTS = 16;
const MAX_MEAL_INGREDIENTS = 21;
const END = 35;

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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

  const ingredients = [];

  for (let i = 1; i < MAX_INGREDIENTS; i += 1) {
    if (recipe[`strIngredient${i}`]) ingredients.push(recipe[`strIngredient${i}`]);
  }

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
  ?? { drinks: {}, meals: {} };

  useEffect(() => {
    if (pathname.includes('drinks')) {
      setCheckedIngredients(inProgressRecipes.drinks[id] ?? []);
    } else {
      setCheckedIngredients(inProgressRecipes.meals[id] ?? []);
    }
  }, []);

  function handleChange(checked, index) {
    if (pathname.includes('drinks')) {
      if (checked) {
        if (inProgressRecipes.drinks[id]) {
          inProgressRecipes.drinks[id] = [...inProgressRecipes.drinks[id], index];

          setCheckedIngredients((prevState) => [...prevState, index]);
        } else {
          inProgressRecipes.drinks[id] = [index];

          setCheckedIngredients([index]);
        }
      } else {
        inProgressRecipes.drinks[id] = inProgressRecipes.drinks[id]
          .filter((element) => element !== index);

        setCheckedIngredients((prevState) => prevState
          .filter((element) => element !== index));
      }

      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

      return;
    }

    if (checked) {
      if (inProgressRecipes.meals[id]) {
        inProgressRecipes.meals[id] = [...inProgressRecipes.meals[id], index];

        setCheckedIngredients((prevState) => [...prevState, index]);
      } else {
        inProgressRecipes.meals[id] = [index];

        setCheckedIngredients([index]);
      }
    } else {
      inProgressRecipes.meals[id] = inProgressRecipes.meals[id]
        .filter((element) => element !== index);

      setCheckedIngredients((prevState) => prevState
        .filter((element) => element !== index));
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  function handleShareClick() {
    if (pathname.includes('drinks')) copy((window.location.href).slice(0, END));
    else copy((window.location.href).slice(0, END - 2));

    setIsCopied(true);
  }

  function handleFavoriteClick() {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  }

  function handleLocalStorage() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];

    if (isFavorite) {
      favoriteRecipes.push({
        id,
        type: pathname.includes('drinks') ? 'drink' : 'meal',
        nationality: recipe.strArea ?? '',
        category: recipe.strCategory ?? '',
        alcoholicOrNot: recipe.strAlcoholic ?? '',
        name: pathname.includes('drinks') ? recipe.strDrink : recipe.strMeal,
        image: pathname.includes('drinks') ? recipe.strDrinkThumb : recipe.strMealThumb,
      });

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

      return;
    }

    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(favoriteRecipes
          .filter((favoriteRecipe) => favoriteRecipe.id !== id)));
  }

  useDidUpdate(handleLocalStorage, [id, isFavorite]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];

    if (favoriteRecipes.find((favoriteRecipe) => favoriteRecipe.id === id)) {
      setIsFavorite(true);
    }
  }, [id]);

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

      <input
        alt="shareIcon"
        data-testid="share-btn"
        onClick={ handleShareClick }
        src={ shareIcon }
        type="image"
      />

      <input
        alt="favoriteIcon"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="image"
      />

      <span data-testid="recipe-category">{ recipe.strCategory }</span>

      {ingredients.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingredient-step` }
          key={ ingredient }
        >
          {ingredient}
          <input
            id={ `${index}-ingredient-step` }
            checked={ checkedIngredients.includes(index + 1) }
            onChange={ ({ target: { checked } }) => handleChange(checked, index + 1) }
            type="checkbox"
          />
        </label>
      ))}

      <p data-testid="instructions">{ recipe.strInstructions }</p>

      <button
        data-testid="finish-recipe-btn"
        disabled={ checkedIngredients.length !== ingredients.length }
        onClick={ () => history.push('/done-recipes') }
        type="button"
      >
        Finish Recipe
      </button>
      {isCopied && <span>Link copied!</span>}
    </>
  );
}

export default RecipeInProgress;
