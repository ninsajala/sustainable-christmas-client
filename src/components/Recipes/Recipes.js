import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeInList from './RecipeInList';
import './recipes.css';
import RecipeSearch from './RecipeSearch';

function Recipes() {
  const [recipeData, setRecipeData] = useState([]);

  function getRecipesFromApi(query, type) {
    //let apiKey1 = `c633d98f9fa7447a88dde9f04357c75e`;
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
    getRecipesFromApi('', '');
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
          <a
            href='https://cookforgood.com/love/local/'
            rel='noreferrer'
            target='_blank'>
            <li>Local</li>
          </a>
          <a
            href='https://cookforgood.com/love/local/'
            rel='noreferrer'
            target='_blank'>
            <li>Seasonal</li>
          </a>
          <a
            href='https://wholelifestylenutrition.com/gardening/organic-on-a-budget-10-tips-to-help-you-buy-organic-food-for-less/'
            rel='noreferrer'
            target='_blank'>
            <li>Organic</li>
          </a>
          <a
            href='https://www.eatright.org/health/lifestyle/culture-and-traditions/sustainable-eating#:~:text=Sustainable%20agriculture%20enables%20us%20to,our%20environment%20and%20our%20bodies.'
            rel='noreferrer'
            target='_blank'>
            <li>Sustainable</li>
          </a>
        </ul>
        <p>Browse the vegetarian recipes below for some inspiration!</p>
        <RecipeSearch searchRecipes={getRecipesFromApi} />
      </div>
      <div>
        {recipeData ? (
          <div className='recipeList'>
            {recipeData.map((recipe) => (
              <RecipeInList key={recipe.id} recipe={recipe} />
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
