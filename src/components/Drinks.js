import React, { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

const END = 5;

function Drinks() {
  const { setDrinks, setDrinksCategories } = useContext(AppContext);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();

      setDrinks(drinks);
    }

    fetchDrinks();
  }, [setDrinks]);

  useEffect(() => {
    async function fetchMealsCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await response.json();

      setDrinksCategories(drinks.slice(0, END).map((drink) => drink.strCategory));
    }

    fetchMealsCategories();
  }, [setDrinksCategories]);

  return (
    <>
      <Header title="Drinks" />
      <Recipes />
    </>
  );
}

export default Drinks;
