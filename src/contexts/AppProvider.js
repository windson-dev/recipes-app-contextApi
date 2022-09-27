import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [meals, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const contextApp = {
    email,
    password,
    setEmail,
    setPassword,
    meals,
    setMeals,
    mealsCategories,
    setMealsCategories,
    drinks,
    setDrinks,
    drinksCategories,
    setDrinksCategories,
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
