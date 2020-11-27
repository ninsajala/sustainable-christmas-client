import React from 'react';

function RecipeList(props) {
  return (
    <div>
      {props.recipes.map((recipe) => (
        <div>
          <h4 key={recipe.id}>{recipe.title}</h4>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
