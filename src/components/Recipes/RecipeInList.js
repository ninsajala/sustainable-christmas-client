import React from 'react';
import { Link } from 'react-router-dom';

function RecipeInList(props) {
  return (
    <div className='oneRecipeList'>
      <Link to={`/recipes/${props.recipe.id}`}>
        <article className='oneListItem'>
          <img src={props.recipe.image} alt={props.recipe.title} />
          <h4>{props.recipe.title}</h4>
        </article>
      </Link>
    </div>
  );
}

export default RecipeInList;
