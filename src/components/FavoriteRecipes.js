import React, { useEffect, useState } from 'react';
import Header from './Header';
import FavoriteRecipeCard from './FavoriteRecipeCard';

function FavoriteRecipes() {
  const [, setFavoriteRecipes] = useState();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(getFavoriteRecipes);
  }, []);

  const Recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];

  function removeFavoriteRecipe(element) {
    const filterDiferentId = Recipes
      .filter(({ id }) => id !== element);
    setFavoriteRecipes((prevState) => prevState
      .filter(({ id }) => id !== element));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterDiferentId));
  }

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meal') }
        type="button"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
        type="button"
      >
        Drinks
      </button>

      {Recipes.filter((element) => filter === 'all' || element.type === filter)
        .map((element, index) => (
          <FavoriteRecipeCard
            key={ element.id }
            name={ element.name }
            nationality={ element.nationality }
            image={ element.image }
            category={ element.category }
            index={ index }
            id={ element.id }
            pathname={ element.type }
            removeFavoriteRecipe={ () => removeFavoriteRecipe(element.id) }
            alcoholicOrNot={ element.alcoholicOrNot }
          />
        ))}
    </div>
  );
}

export default FavoriteRecipes;
