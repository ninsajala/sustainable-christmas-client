import React, { useState } from 'react';

function CharitySearch(props) {
  const [select, setSelect] = useState('climate');

  const selectHandler = (event) => {
    setSelect(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.searchProjects(select);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='row'>
        <select
          className='form-control col-sm-8'
          name='theme'
          onChange={selectHandler}>
          <option value='climate'>Climate Action</option>
          <option value='animals'>Animals</option>
          <option value='children'>Child Protection</option>
          <option value='disaster'>Disaster Response</option>
          <option value='health'>Physical health</option>
          <option value='ecdev'>Economic Growth</option>
          <option value='democ'>Peace and Reconciliation</option>
          <option value='edu'>Education</option>
          <option value='env'>Ecosystem Restoration</option>
          <option value='gender'>Gender Equality </option>
          <option value='human'>End Human Trafficking</option>
          <option value='rights'>Justice and Human Rights</option>
          <option value='sport'>Sport</option>
          <option value='tech'>Digital Literacy</option>
          <option value='hunger'>Hunger</option>
          <option value='lgbtq'>LGBTQIA+ Equality</option>
          <option value='covid-19'>COVID-19</option>
          <option value='water'>Clean Water</option>
          <option value='disability'>Disability Rights</option>
          <option value='endabuse'>End Abuse</option>
          <option value='mentalhealth'>Mental Health</option>
          <option value='justice'>Racial Justice</option>
          <option value='Refugee'>Refugee</option>
          <option value='Reproductive'>Reproductive Health</option>
          <option value='housing'>Safe Housing</option>
          <option value='agriculture'>Sustainable Agriculture</option>
          <option value='wildlife'>Wildlife Conservation</option>
        </select>
        <button type='submit' className='btn btn-warning col-sm-4'>
          Search
        </button>
      </form>
    </div>
  );
}

export default CharitySearch;
