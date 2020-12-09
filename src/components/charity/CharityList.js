import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharitySearch from './CharitySearch';

function CharityList() {
  const [charityData, setCharityData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function getCharitiesFromApi() {
    axios
      .get(
        `https://api.globalgiving.org/api/public/projectservice/all/projects/active/summary/?api_key=0384aa74-ebb6-45f8-aa07-d0d7df74ee9c`
      )
      .then((response) => {
        setCharityData(response.data.projects);
        setLoaded(true);
      })
      .catch((error) => error);
  }

  useEffect(getCharitiesFromApi, []);

  return loaded ? (
    <div className='charityOverview'>
      <div className='recipeIntro'>
        <h4>Give away to Charity</h4>
        <p>
          In stead of buying gifts, you can choose to give away your money to a
          charity project. Browse the projects below to find the best fitting
          option!
        </p>
        <CharitySearch searchProjects={getCharitiesFromApi} />
      </div>
      {charityData.project.map((item) => (
        <div key={item.id} className='oneTipList'>
          <h4>{item.organization.name}</h4>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default CharityList;
