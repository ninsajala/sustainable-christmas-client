import React from 'react';

function Recipe(props) {
  return (
    <div className='oneRecipeList'>
      <h3>{props.recipe.title}</h3>
      <img src={props.recipe.image} alt={props.recipe.title} />
    </div>
  );
}

export default Recipe;
