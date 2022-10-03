import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';
import Meals from './components/Meals';
import MealInProgress from './components/MealInProgress';
import Drinks from './components/Drinks';
import DrinkInProgress from './components/DrinkInProgress';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="">
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/Meals" component={ Meals } />
          <Route exact path="/Drinks" component={ Drinks } />
          <Route exact path="/Meals/:id" component={ RecipeDetails } />
          <Route exact path="/Drinks/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
          <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
          <Route exact path="/Profile" component={ Profile } />
          <Route exact path="/Done-Recipes" component={ DoneRecipes } />
          <Route exact path="/Favorite-Recipes" component={ FavoriteRecipes } />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;
