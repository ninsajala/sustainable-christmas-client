import './Tips.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import AddFavorite from './DetailsComponents/AddFavorite';
import RemoveFavorite from './DetailsComponents/RemoveFavorite';
import CommentSection from './DetailsComponents/CommentSection';

function TipDetails(props) {
  const [tipDetails, setTipDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { params } = props.match;

  const getTipDetails = () => {
    axios
      .get(
        //`http://localhost:5000/tips/${params.id}`
        `https://sustainable-christmas-server.herokuapp.com/tips/${params.id}`
      )
      .then((foundTip) => {
        setTipDetails(foundTip.data);
        setLoaded(true);
      });
  };

  useEffect(() => {
    getTipDetails();
  }, []);

  const handleDeleteTip = () => {
    axios
      .delete(
        //`http://localhost:5000/tips/${tipDetails._id}`
        `https://sustainable-christmas-server.herokuapp.com/tips/${tipDetails._id}`
      )
      .then(() => props.history.push(`/tips`));
  };

  const checkIfOwner = () => {
    if (tipDetails.author._id === props.loggedInUser._id) {
      return (
        <div className='form-group button-group'>
          <Link to={`/tips/edit/${tipDetails._id}`}>
            <button className='btn btn-warning btn-sm'>
              <i class='fas fa-edit'></i>
            </button>
          </Link>

          <button className='btn btn-danger btn-sm' onClick={handleDeleteTip}>
            <i class='fas fa-trash-alt'></i>
          </button>
        </div>
      );
    }
  };

  const checkIfFavorite = () => {
    if (
      props.loggedInUser.favorites.find(
        (element) => element._id === tipDetails._id
      )
    ) {
      return (
        <RemoveFavorite
          loggedInUser={props.loggedInUser}
          tipDetails={tipDetails}
          updateTip={getTipDetails}
          checkFavorite={checkIfFavorite}
          getUser={props.getUser}
        />
      );
    } else {
      return (
        <AddFavorite
          loggedInUser={props.loggedInUser}
          tipDetails={tipDetails}
          updateTip={getTipDetails}
          checkFavorite={checkIfFavorite}
          getUser={props.getUser}
        />
      );
    }
  };

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div className='tipDetails'>
          <h3>{tipDetails.title}</h3>
          <div className='tipDetailHeaderInfo'>
            <div className='authorSection'>
              <p>
                Written by {tipDetails.author.firstName}{' '}
                {tipDetails.author.lastName}
              </p>
              {checkIfOwner()}
            </div>
            <div className='favoriteSection'>
              <p>
                {tipDetails.addedToFavorites.length} times added to favorites
              </p>
              {checkIfFavorite()}
            </div>
          </div>
          <div className='tipDetailsMain'>
            {tipDetails.picture ? (
              <div
                className='detailsPicture'
                style={{
                  backgroundImage: `url(${tipDetails.picture})`,
                }}></div>
            ) : (
              <div
                className='detailsPicture'
                style={{
                  backgroundImage: `url('../../images/joanna-kosinska-h2O_jHvjfIM-unsplash.jpg)`,
                }}></div>
            )}
            <p>{tipDetails.content}</p>
          </div>
          <div className='tipDetailsBottomSection'>
            {tipDetails.extraInfo && (
              <a href={tipDetails.extraInfo} rel='noreferrer' target='_blank'>
                <button className='btn btn-warning'>More info</button>
              </a>
            )}
            <CommentSection
              getTipDetails={getTipDetails}
              tipDetails={tipDetails}
              loggedInUser={props.loggedInUser}
            />
          </div>
        </div>
      ) : (
        <p className='logInWarning'>Loading details..</p>
      )}
    </div>
  ) : (
    <p className='logInWarning'>
      Please log in to see this page <br />
      <Link to={'/login'}>
        <button className='btn btn-warning'>Login</button>
      </Link>
    </p>
  );
}

export default withRouter(TipDetails);
