import React, { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

function Meals() {
  const { setMeals } = useContext(AppContext);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();

      setMeals(meals);
    }

    fetchMeals();
  }, [setMeals]);

  return (
    <>
      <Header title="Meals" />
      <Recipes />
    </>
  );
}

export default Meals;
