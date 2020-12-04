import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import './recipes.css';

function Recipes() {
  const [recipeData, setRecipeData] = useState([]);

  //let ApiKey = `c633d98f9fa7447a88dde9f04357c75e`;

  function getRecipesFromApi() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=c633d98f9fa7447a88dde9f04357c75e&diet=vegetarian&number=30`
      )
      .then((data) => {
        setRecipeData(data.data.results);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getRecipesFromApi();
  }, []);

  return (
    <div className='recipeOverview'>
      <h2>Christmas Recipes</h2>
      <p>
        Keep these four things in mind for a more environment friendly Christmas
        dinner:
      </p>

      <ul>
        <li>Local</li>
        <li>Seasonal</li>
        <li>Organic</li>
        <li>Sustainable</li>
      </ul>
      <p>Browse the vegetarian recipes below for some inspiration!</p>
      <div>
        {recipeData ? (
          recipeData.map((recipe, index) => (
            <Recipe key={index} recipe={recipe} />
          ))
        ) : (
          <div>Loading recipes</div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
