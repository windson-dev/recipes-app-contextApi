import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardItem from './CardItem';
import AppContext from '../contexts/AppContext';

const FINAL_INDEX = 12;

function Recipes() {
  const { location: { pathname } } = useHistory();
  const { drinks, meals } = useContext(AppContext);

  return pathname === '/drinks'
    ? drinks.slice(0, FINAL_INDEX).map(({ strDrink, strDrinkThumb }, index) => (
      <CardItem
        index={ index }
        key={ strDrink }
        str={ strDrink }
        strThumb={ strDrinkThumb }
      />
    ))
    : meals.slice(0, FINAL_INDEX).map(({ strMeal, strMealThumb }, index) => (
      <CardItem
        index={ index }
        key={ strMeal }
        str={ strMeal }
        strThumb={ strMealThumb }
      />
    ));
}

export default Recipes;
