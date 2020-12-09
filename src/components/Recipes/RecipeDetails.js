import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeDetails(props) {
  const [recipeData, setRecipeData] = useState('');
  const { params } = props.match;

  useEffect(() => {
    //let apiKey1 = `c633d98f9fa7447a88dde9f04357c75e`;
    let apiKey2 = `07d365fbfe3e48659de82374b916c33b`;
    axios
      .get(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey2}`
      )
      .then((response) => {
        setRecipeData(response.data);
      });
  }, [params.id]);

  return recipeData ? (
    <div className='tipDetails'>
      <h3>{recipeData.title}</h3>
      <div
        className='recipeImage detailsPicture'
        style={{
          backgroundImage: `url(${recipeData.image})`,
        }}></div>
      <div className='recipeInstructions'>
        <ul>
          <b>Ingredients for {recipeData.servings} servings</b>
          {recipeData.extendedIngredients.map((item, index) => (
            <li key={index}>
              {Math.round(item.measures.metric.amount)} {}
              {item.measures.metric.unitShort} {}
              {item.name}
            </li>
          ))}
        </ul>
        <ol>
          <b>Instructions</b>
          {recipeData.analyzedInstructions[0] ? (
            recipeData.analyzedInstructions[0].steps.map((item, index) => (
              <li key={index}>{item.step}</li>
            ))
          ) : (
            <p>Could not find instructions for this recipe..</p>
          )}
        </ol>
      </div>
      <a href={recipeData.sourceUrl} rel='noreferrer' target='_blank'>
        <button className='btn btn-warning'>More info</button>
      </a>
    </div>
  ) : (
    <div>Loading Recipe</div>
  );
}

export default RecipeDetails;
