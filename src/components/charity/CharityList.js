import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharitySearch from './CharitySearch';
import './charity.css';

function CharityList() {
  const [charityData, setCharityData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function getCharitiesFromApi(themeId) {
    axios
      .get(
        `https://api.globalgiving.org/api/public/projectservice/themes/${themeId}/projects/active/summary/?api_key=0384aa74-ebb6-45f8-aa07-d0d7df74ee9c`
      )
      .then((response) => {
        console.log(response.data.projects);
        setCharityData(response.data.projects);
        setLoaded(true);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getCharitiesFromApi('climate');
  }, []);

  return loaded ? (
    <div className='charityOverview'>
      <div className='charityIntro'>
        <h4>Give away to Charity</h4>
        <p>
          In stead of buying gifts, you can choose to give away your money to a
          charity project. Browse the projects below by theme to find the best
          fitting option!
        </p>
        <CharitySearch searchProjects={getCharitiesFromApi} />
      </div>
      <div className='charityList'>
        {charityData.project.map((item) => (
          <article className='oneProject' key={item.id}>
            <h4>{item.title}</h4>
            <img src={item.imageLink} alt={item.organization.name} />
            <p>A project from {item.organization.name}</p>
            <p>{item.summary}</p>
            <button className='btn btn-warning'>
              <a href={item.url} rel='noreferrer' target='_blank'>
                More Info
              </a>
            </button>
          </article>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default CharityList;
