import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
// import Meal from './components/Meal';
// import Drink from './components/Drink';
import RecipeDetails from './components/RecipeDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <AppProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/Meals" component={ Meals } />
            <Route exact path="/Drinks" component={ Drinks } />
            <Route exact path="/Meals/:id" component={ RecipeDetails } />
            <Route exact path="/Drinks/:id" component={ RecipeDetails } />
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
