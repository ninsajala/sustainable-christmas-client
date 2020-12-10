import React, { useState } from 'react';

function TipSearch(props) {
  const [searchInput, setSearchInput] = useState({ category: '', search: '' });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.searchArticles(searchInput);
  };

  return (
    <div className='searchBarWrap'>
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <select
            className='form-control col-sm-3'
            name='category'
            onChange={inputChangeHandler}>
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
          <button type='submit' className='btn btn-warning col-sm-3'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default TipSearch;
