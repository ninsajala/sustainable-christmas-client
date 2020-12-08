import React, { useState } from 'react';

const initialState = {
  query: '',
  type: '',
};

function RecipeSearch(props) {
  const [searchInput, setSearchInput] = useState(initialState);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { query, type } = searchInput;
    props.searchRecipes(query, type);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <input
            className='form-control col-sm-6'
            type='text'
            name='query'
            placeholder='Search for Recipe'
            onChange={inputChangeHandler}
          />
          <select
            className='form-control col-sm-3'
            name='type'
            onChange={inputChangeHandler}>
            <option value=''>All</option>
            <option value='Main Course'>Main Course</option>
            <option value='Side Dish'>Side Dish</option>
            <option value='Dessert'>Dessert</option>
            <option value='Appetizer'>Appetizer</option>
            <option value='Salad'>Salad</option>
            <option value='Soup'>Soup</option>
            <option value='Fingerfood'>Fingerfood</option>
          </select>
          <button type='submit' className='btn btn-dark col-sm-3'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeSearch;
