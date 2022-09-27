import React, { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

const END = 5;

function Drinks() {
  const { drinksCategory, setDrinks, setDrinksCategories } = useContext(AppContext);

  useEffect(() => {
    async function fetchDrinks() {
      const response = drinksCategory === 'All'
        ? await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        : await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinksCategory}`);
      const { drinks } = await response.json();

      setDrinks(drinks);
    }

    fetchDrinks();
  }, [drinksCategory, setDrinks]);

  useEffect(() => {
    async function fetchDrinksCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await response.json();

      setDrinksCategories((prevState) => [...prevState, ...drinks
        .slice(0, END).map((drink) => drink.strCategory)]);
    }

    fetchDrinksCategories();
  }, [setDrinksCategories]);

  return (
    <>
      <Header title="Drinks" />
      <Recipes />
    </>
  );
}

export default Drinks;
