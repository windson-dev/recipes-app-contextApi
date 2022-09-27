import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const myStyle = {
    position: 'fixed',
    bottom: '0px',
  };
  const history = useHistory();

  const toMeals = () => {
    history.push('/meals');
  };

  const toDrinks = () => {
    history.push('/drinks');
  };

  return (
    <div
      style={ myStyle }
      data-testid="footer"
    >
      <input
        type="image"
        alt="meal icon"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ toMeals }
      />
      <input
        type="image"
        alt="drink icon"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ toDrinks }
      />

    </div>
  );
}

export default Footer;
