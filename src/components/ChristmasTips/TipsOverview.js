import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TipsOverview() {
  const [allTips, setAllTips] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://localhost:5000/tips'
        //'https://sustainable-christmas-server.herokuapp.com/tips'
      )
      .then((foundTips) => {
        setAllTips(foundTips.data);
      });
  }, []);

  return (
    <div className='tipsOverview'>
      <div className='allTipsWrapper'>
        {allTips.map((item) => (
          <Link key={item._id} to={`/tips/${item._id}`}>
            <article className='oneTipList'>
              <img src={item.picture} alt={item.title} />
              <h4>{item.title}</h4>
            </article>
          </Link>
        ))}
      </div>
      <Link to='/tips/add'>
        <button className='btn btn-dark btn-lg' title='Go to addition form'>
          Add a Tip
        </button>
      </Link>
    </div>
  );
}

export default TipsOverview;
