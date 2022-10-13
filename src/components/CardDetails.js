import { arrayOf, string } from 'prop-types';
import React from 'react';

function CardDetails({ image, title, video,
  instructions, ingredient, category, measure }) {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
        width="300px"
      />

      <h1 data-testid="recipe-title">{ title }</h1>
      <p data-testid="recipe-category">{ category }</p>

      <p data-testid={ ingredient }>{ ingredient }</p>

      <p data-testid={ ingredient }>{ measure }</p>

      <p data-testid="instructions">{ instructions }</p>

      <iframe
        title={ title }
        width="300"
        height="300"
        src={ video }
        data-testid="video"
      />
    </div>
  );
}

CardDetails.propTypes = {
  image: string,
  title: string,
  video: string,
  instructions: string,
  measure: arrayOf,
  ingredient: string,
  category: string,
};

CardDetails.defaultProps = {
  image: '',
  title: '',
  video: '',
  instructions: '',
  measure: '',
  ingredient: '',
  category: '',
};

export default CardDetails;
