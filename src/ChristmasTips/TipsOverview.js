import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TipsOverview() {
  const [allTips, setAllTips] = useState([]);

  useEffect(() => {
    axios
      .get('https://sustainable-christmas-server.herokuapp.com/tips')
      .then((foundTips) => {
        setAllTips(foundTips.data);
      });
  }, []);

  return (
    <div className='allTipsWrapper'>
      {allTips.map((item) => (
        <Link key={item._id} to={`/tips/${item._id}`}>
          <div className='oneTipList'>
            <h4>{item.title}</h4>
            <img src={item.picture} alt={item.title} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TipsOverview;
