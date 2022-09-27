import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardItem from './CardItem';
import AppContext from '../contexts/AppContext';

const FINAL_INDEX = 12;

function Recipes() {
  const { location: { pathname } } = useHistory();
  const { drinks, meals } = useContext(AppContext);

  return pathname === '/drinks'
    ? drinks
      .slice(0, FINAL_INDEX)
      .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <CardItem
          id={ idDrink }
          index={ index }
          key={ strDrink }
          pathname={ pathname }
          str={ strDrink }
          strThumb={ strDrinkThumb }
        />
      ))
    : meals
      .slice(0, FINAL_INDEX)
      .map(({ idMeal, strMeal, strMealThumb }, index) => (
        <CardItem
          id={ idMeal }
          index={ index }
          key={ strMeal }
          pathname={ pathname }
          str={ strMeal }
          strThumb={ strMealThumb }
        />
      ));
}

export default Recipes;
