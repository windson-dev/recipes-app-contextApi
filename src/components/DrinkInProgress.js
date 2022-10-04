import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AppContext from '../contexts/AppContext';

function DrinkInProgress() {
  const { recipies, setRecipies } = useContext(AppContext);
  const { id } = useParams();
  // console.log(id);
  // console.log(recipies);

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data);
      setRecipies(data.drinks[0]);
    };
    fetchDrink();
  }, [id, setRecipies]);
  return (
    <>
      <img
        src={ recipies.strDrinkThumb }
        alt={ recipies.srtDrink }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipies.strDrink }
      </h1>

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorito
      </button>

      <span
        data-testid="recipe-category"
      >
        { recipies.strCategory }
      </span>

      <p
        data-testid="instructions"
      >
        { recipies.strInstructions }
      </p>

      {/* <label
        htmlFor="checkbox"
        // key={  }
        // data-testid={ `${index}-ingredient-step` }
      >
        {  }
        <input type="checkbox" id="checkbox" />
      </label> */}

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </>
  );
}

export default DrinkInProgress;
