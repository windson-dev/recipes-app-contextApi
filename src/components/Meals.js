import React, { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

const END = 5;

function Meals() {
  const { mealsCategory, setMeals, setMealsCategories } = useContext(AppContext);

  useEffect(() => {
    async function fetchMeals() {
      const response = mealsCategory === 'All'
        ? await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        : await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealsCategory}`);
      const { meals } = await response.json();

      setMeals(meals);
    }

    fetchMeals();
  }, [mealsCategory, setMeals]);

  useEffect(() => {
    async function fetchMealsCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();

      setMealsCategories((prevState) => [...prevState, ...meals
        .slice(0, END).map((meal) => meal.strCategory)]);
    }

    fetchMealsCategories();
  }, [setMealsCategories]);

  return (
    <>
      <Header title="Meals" />
      <Recipes />
    </>
  );
}

export default Meals;
