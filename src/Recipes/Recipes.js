import React, { useState } from 'react';
import axios from 'axios';
import Recipelist from './recipelist';

function Recipes() {
  const [recipeData, setRecipeData] = useState('');

  //let ApiKey = `c633d98f9fa7447a88dde9f04357c75e`;

  function getRecipesFromApi() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=c633d98f9fa7447a88dde9f04357c75e&diet=vegetarian&number=30`
      )
      .then((data) => {
        console.log(data);
        setRecipeData(data.results);
      })
      .catch((error) => error);
  }

  return (
    <div>
      <h2>Christmas Recipes</h2>
      <p>
        Cooking your 5-course Christmas dinner in a more sustainable way is
        easier than you might think. Just keep a couple of things in mind:
      </p>

      <ul>
        <li>
          Use as many <b>locally produced products</b> as possible. Choosing
          local means less transportation + you support locals. It's a win-win!
        </li>
        <li>
          Use <b>seasonal</b> fruit, vegetables and nuts. They taste better, are
          more healthy, cheaper and of course better for the environment.
        </li>
        <li>
          Go <b>organic</b>! Mainly for eggs, meat, dairy and fish it makes a
          big difference on how animals have been treated.
        </li>
        <li>
          Check if your fish is sustainably caught or bred. This{' '}
          <a
            href='https://www.goodfish.nl/en/'
            target='_blank'
            rel='noreferrer'>
            website
          </a>{' '}
          gives a good overview.
        </li>
      </ul>
      <p>Browse the vegetarian recipes below for some inspiration!</p>
      <div>
        {!recipeData.length ? (
          ((<p>Data is loading</p>), getRecipesFromApi())
        ) : (
          <Recipelist recipes={recipeData} />
        )}
      </div>
    </div>
  );
}

export default Recipes;
