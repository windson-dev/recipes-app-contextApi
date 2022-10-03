import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [meals, setMeals] = useState([]);
  const [mealsCategory, setMealsCategory] = useState('All');
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState('All');
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendedDrinks, setRecommendedDrinks] = useState();
  const [recommendedMeals, setRecommendedMeals] = useState();

  const contextApp = {
    email,
    password,
    setEmail,
    setPassword,
    meals,
    setMeals,
    mealsCategory,
    setMealsCategory,
    mealsCategories,
    setMealsCategories,
    drinks,
    setDrinks,
    drinksCategory,
    setDrinksCategory,
    drinksCategories,
    setDrinksCategories,
    recipeDetails,
    setRecipeDetails,
    recommendedDrinks,
    setRecommendedDrinks,
    recommendedMeals,
    setRecommendedMeals,
  };

  return (
    <AppContext.Provider value={ contextApp }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
