import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';
import Meals from './components/Meals';
import RecipeInProgress from './components/RecipeInProgress';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
        <Route path="/" component={ Login } />
      </Switch>
    </AppProvider>
  );
}

export default App;
