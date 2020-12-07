import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { Link, withRouter, Redirect } from 'react-router-dom';
import AddFavorite from './AddFavorite';
import RemoveFavorite from './RemoveFavorite';

function TipDetails(props) {
  const [tipDetails, setTipDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { params } = props.match;

  const getTipDetails = () => {
    axios
      .get(
        `http://localhost:5000/tips/${params.id}`
        //`https://sustainable-christmas-server.herokuapp.com/tips/${params._id}`
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
        `http://localhost:5000/tips/${tipDetails._id}`
        //`https://sustainable-christmas-server.herokuapp.com/tips/${tipDetails._id}`
      )
      .then(() => props.history.push(`/tips`));
  };

  const checkIfOwner = () => {
    if (tipDetails.author._id === props.loggedInUser._id) {
      return (
        <div className='form-group button-group'>
          <Link to={`/tips/edit/${tipDetails._id}`}>
            <button className='btn btn-dark'>Edit Tip</button>
          </Link>

          <button className='btn btn-danger' onClick={handleDeleteTip}>
            Remove Tip
          </button>
        </div>
      );
    }
  };

  const handleRemoveComment = (id) => {
    axios
      .delete(
        `http://localhost:5000/comment/${id}`
        //`https://sustainable-christmas-server.herokuapp.com/comment/${id}`
      )
      .then(() => {
        getTipDetails();
      });
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
        />
      );
    } else {
      return (
        <AddFavorite
          loggedInUser={props.loggedInUser}
          tipDetails={tipDetails}
          updateTip={getTipDetails}
          checkFavorite={checkIfFavorite}
        />
      );
    }
  };

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div className='tipDetails'>
          <h3>{tipDetails.title}</h3>
          <p>
            Written by {tipDetails.author.firstName}{' '}
            {tipDetails.author.lastName}
          </p>
          <p>Added to favorites by: {tipDetails.addedToFavorites.length}</p>
          <img src={tipDetails.picture} alt={tipDetails.title} />
          <p>{tipDetails.content}</p>
          {tipDetails.extraInfo && (
            <a href={tipDetails.extraInfo} rel='noreferrer' target='_blank'>
              More info
            </a>
          )}
          {checkIfFavorite()}
          {checkIfOwner()}
          {tipDetails.comments.length === 0 && <p>Leave the first comment</p>}
          {tipDetails.comments.length > 0 && (
            <div className='commentSection'>
              <h5>Comments:</h5>
              {tipDetails.comments.map((item) => (
                <div className='oneComment'>
                  <q key={item._id}>{item.content}</q>
                  <p>- {item.author.firstName}</p>
                  {props.loggedInUser.comments.includes(item._id) && (
                    <button
                      className='btn btn-dark'
                      onClick={() => handleRemoveComment(item._id)}
                      title={`Remove Comment ${item._id}`}>
                      x
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          <Comment
            tip={tipDetails._id}
            user={props.loggedInUser._id}
            updateTip={getTipDetails}
          />
        </div>
      ) : (
        <div>Loading tip</div>
      )}
    </div>
  ) : (
    <p>You need to be logged in to see this page</p>
  );
}

export default withRouter(TipDetails);
