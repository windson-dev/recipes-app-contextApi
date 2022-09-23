import React from 'react';
import Header from './Header';
import getApiId from '../services/serviceAPI';

function Meals() {
  getApiId();
  return (
    <div>
      <Header title="meals" />
      <p>COMIDAS</p>
    </div>
  );
}

export default Meals;
