import React, { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Header from './Header';
import Recipes from './Recipes';

function Drinks() {
  const { setDrinks } = useContext(AppContext);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();

      setDrinks(drinks);
    }

    fetchDrinks();
  }, [setDrinks]);

  return (
    <>
      <Header title="Drinks" />
      <Recipes />
    </>
  );
}

export default Drinks;
