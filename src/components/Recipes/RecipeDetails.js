import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeDetails(props) {
  const [recipeData, setRecipeData] = useState('');
  const { params } = props.match;

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=c633d98f9fa7447a88dde9f04357c75e`
      )
      .then((response) => {
        console.log(response.data);
        setRecipeData(response.data);
      });
  }, [params.id]);

  return recipeData ? (
    <div className='tipDetails'>
      <h3>{recipeData.title}</h3>
      <img src={recipeData.image} alt={recipeData.title} />
      <div className='recipeInstructions'>
        <ul>
          <b>Ingredients for {recipeData.servings} servings</b>
          {recipeData.extendedIngredients.map((item) => (
            <li>
              {Math.round(item.measures.metric.amount)} {}
              {item.measures.metric.unitShort} {}
              {item.name}
            </li>
          ))}
        </ul>
        <ol>
          <b>Instructions</b>
          {recipeData.analyzedInstructions[0].steps.map((item) => (
            <li>{item.step}</li>
          ))}
        </ol>
      </div>
      <a href={recipeData.sourceUrl} rel='noreferrer' target='_blank'>
        More info
      </a>
    </div>
  ) : (
    <div>Loading Recipe</div>
  );
}

export default RecipeDetails;
