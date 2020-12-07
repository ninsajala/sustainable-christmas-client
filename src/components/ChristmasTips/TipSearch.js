import React, { useState } from 'react';

function TipSearch(props) {
  const [searchInput, setSearchInput] = useState('');
  const [select, setSelect] = useState('');

  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const selectHandler = (event) => {
    console.log(event.target.value);
    setSelect(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.searchArticles(searchInput, select);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <select
            className='form-control col-sm-3'
            name='category'
            onChange={selectHandler}>
            <option value=''>All</option>
            <option value='Food'>Food</option>
            <option value='Gifts'>Gifts</option>
            <option value='Decoration'>Decoration</option>
            <option value='Charity'>Charity</option>
            <option value='Other'>Other</option>
          </select>
          <input
            className='form-control col-sm-6'
            type='text'
            name='search'
            placeholder='Search Tips'
            autoComplete='off'
            onChange={inputChangeHandler}
          />
          <button type='submit' className='btn btn-dark col-sm-3'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default TipSearch;
