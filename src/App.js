import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const api = async (endpointID) => {
//   const URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${endpointID}`;
//   const response = await fetch(URL);
//   const data = await response.json();
//   return data.meals[0].idMeal;
// };

function App() {
  return (
    <BrowserRouter>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <AppProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/Meals" component={ Meals } />
            <Route exact path="/Drinks" component={ Drinks } />
            <Route exact path="/Meals/:id" />
            <Route exact path="/Drinks/:id" />
            <Route exact path="/Profile" component={ Profile } />
            <Route exact path="/Done-Recipes" component={ DoneRecipes } />
            <Route exact path="/Favorite-Recipes" component={ FavoriteRecipes } />
          </Switch>
        </AppProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
