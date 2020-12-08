import React, { useState } from 'react';

const initialState = {
  theme: '',
};

function CharitySearch(props) {
  const [searchInput, setSearchInput] = useState(initialState);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { theme } = searchInput;
    props.searchProjects(theme);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <input
            className='form-control col-sm-6'
            type='text'
            name='query'
            placeholder='Search for a Project'
            onChange={inputChangeHandler}
          />
          <select
            className='form-control col-sm-3'
            name='theme'
            onChange={inputChangeHandler}>
            <option value=''>All</option>
            <option value='animals'>Animals</option>
            <option value='children'>Child Protection</option>
            <option value='climate'>Climate Action</option>
            <option value='democ'>Peace and Reconciliation</option>
            <option value='edu'>Education</option>
            <option value='env'>Ecosystem Restoration</option>
            <option value='gender'>Gender Equality </option>
          </select>
          <button type='submit' className='btn btn-warning col-sm-3'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default CharitySearch;
