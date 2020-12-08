import React, { useState, useEffect } from 'react';
import axios from 'axios';
import convert from 'xml-js';

function CharityList() {
  const [charityData, setCharityData] = useState([]);

  function getCharitiesFromApi() {
    axios
      .get(
        `https://api.globalgiving.org/api/public/projectservice/all/projects/active/summary/?api_key=0384aa74-ebb6-45f8-aa07-d0d7df74ee9c`
      )
      .then((response) => {
        console.log(response.data.projects.project);
        //console.log(convert.xml2js(response));
        setCharityData(response.data.projects);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getCharitiesFromApi();
  }, []);

  return charityData ? (
    <div>
      <p>Projects:</p>
      {charityData.project.map((item) => (
        <div key={item.id}>
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
