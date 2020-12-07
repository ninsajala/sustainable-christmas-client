import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TipSearch from './TipSearch';

function TipsOverview() {
  const [allTips, setAllTips] = useState([]);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://localhost:5000/tips'
        //'https://sustainable-christmas-server.herokuapp.com/tips'
      )
      .then((foundTips) => {
        setApiData(foundTips.data);
        setAllTips(foundTips.data);
      });
  }, []);

  function searchArticles(input, select) {
    let allTipsCopy = [...allTips];

    if (!input && !select) {
      setAllTips(apiData);
    } else if (!input) {
      setAllTips(allTipsCopy.filter((item) => item.category.includes(select)));
    } else {
      setAllTips(
        allTipsCopy.filter(
          (item) =>
            item.title.toLowerCase().includes(input.toLowerCase()) &&
            item.category.includes(select)
        )
      );
    }
  }

  return (
    <div className='tipsOverview'>
      <Link to='/tips/add'>
        <button className='btn btn-dark btn-lg' title='Go to addition form'>
          Add a Tip
        </button>
      </Link>
      <TipSearch searchArticles={searchArticles} />
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
    </div>
  );
}

export default TipsOverview;
