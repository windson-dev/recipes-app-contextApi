import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <AppProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/Meals" component={ Meals } />
          <Route exact path="/Drinks" component={ Drinks } />
        </AppProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
