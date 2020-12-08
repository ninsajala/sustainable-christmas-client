import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeInList from './RecipeInList';
import './recipes.css';
import RecipeSearch from './RecipeSearch';

function Recipes() {
  const [recipeData, setRecipeData] = useState([]);
  //const [loaded, setLoaded] = useState

  function getRecipesFromApi(query, type) {
   let apiKey1 = `c633d98f9fa7447a88dde9f04357c75e`;
   let apiKey2 = `07d365fbfe3e48659de82374b916c33b`;
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey2}&query=${query}&diet=vegetarian&number=50&type=${type}`
      )
      .then((response) => {
        setRecipeData(response.data.results);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getRecipesFromApi('','');
  }, []);

  return (
    <div className='recipeOverview'>
      <div className='recipeIntro'>
        <h2>Christmas Recipes</h2>
        <p>
          Cooking more environment friendly is easy, just keep these for things
          in mind:
        </p>
        <ul>
          <li>Local</li>
          <li>Seasonal</li>
          <li>Organic</li>
          <li>Sustainable</li>
        </ul>
        <p>Browse the vegetarian recipes below for some inspiration!</p>
        <RecipeSearch searchRecipes={getRecipesFromApi} />
      </div>
      <div>
        {recipeData ? (
          <div className='recipeList'>
            {recipeData.map((recipe) => (
              <RecipeInList recipe={recipe} />
            ))}
          </div>
        ) : (
          <div>Loading recipes</div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
