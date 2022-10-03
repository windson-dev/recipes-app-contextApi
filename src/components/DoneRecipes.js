import React, { useState } from 'react';
import Header from './Header';
import DoneMealCardItem from './DoneMealCardItem';
import DoneDrinkCardItem from './DoneDrinkCardItem';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];

  return (
    <div>
      <Header title="Done Recipes" />
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
      {doneRecipes
        .filter((doneRecipe) => filter === 'all' || doneRecipe.type === filter)
        .map((doneRecipe, index) => (
          doneRecipe.type === 'meal'
            ? (
              <DoneMealCardItem
                category={ doneRecipe.category }
                doneDate={ doneRecipe.doneDate }
                id={ doneRecipe.id }
                image={ doneRecipe.image }
                index={ index }
                name={ doneRecipe.name }
                nationality={ doneRecipe.nationality }
                key={ doneRecipe.name }
                tags={ doneRecipe.tags }
              />
            )
            : (
              <DoneDrinkCardItem
                alcoholicOrNot={ doneRecipe.alcoholicOrNot }
                category={ doneRecipe.category }
                doneDate={ doneRecipe.doneDate }
                id={ doneRecipe.id }
                image={ doneRecipe.image }
                index={ index }
                name={ doneRecipe.name }
                key={ doneRecipe.name }
              />
            )
        ))}
    </div>
  );
}

export default DoneRecipes;
