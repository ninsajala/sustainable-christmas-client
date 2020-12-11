import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TipSearch from './TipSearch';

function TipsOverview() {
  const [allTips, setAllTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [searching, setSearching] = useState([false]);

  useEffect(() => {
    axios
      .get('https://sustainable-christmas-server.herokuapp.com/tips')
      .then((foundTips) => {
        setFilteredTips(foundTips.data);
        setAllTips(foundTips.data);
      });
  }, []);

  function searchArticles(searchInput) {
    let allTipsCopy = [...allTips];

    const filteredArticles = allTipsCopy.filter(
      (item) =>
        item.category.includes(searchInput.category) &&
        item.content.toLowerCase().includes(searchInput.search.toLowerCase())
    );
    setFilteredTips(filteredArticles);
    setSearching(true);
  }

  return (
    <div className='tipsOverview'>
      <div className='tipOverviewHeader'>
        {' '}
        <Link to='/tips/add'>
          <button className='btn btn-warning' title='Go to addition form'>
            Add a Tip
          </button>
        </Link>
        <TipSearch searchArticles={searchArticles} />
      </div>

      <div className='allTipsWrapper'>
        {searching
          ? filteredTips.map((item) => (
              <Link key={item._id} to={`/tips/${item._id}`}>
                <article className='oneListItem'>
                  <img src={item.picture} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>
                    By {item.author.firstName} {item.author.lastName}
                  </p>
                </article>
              </Link>
            ))
          : allTips.map((item) => (
              <Link key={item._id} to={`/tips/${item._id}`}>
                <article className='oneListItem'>
                  <img src={item.picture} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>
                    By {item.author.firstName} {item.author.lastName}
                  </p>
                </article>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default TipsOverview;
