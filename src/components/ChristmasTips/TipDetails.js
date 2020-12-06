import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { Link, withRouter, Redirect } from 'react-router-dom';

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
        console.log(foundTip.data);
        setTipDetails(foundTip.data);
        setLoaded(true);
      });
  };

  useEffect(() => {
    getTipDetails();
  }, []);

  function addToFavorites() {
    let userId = props.loggedInUser._id;
    let tipId = tipDetails._id;

    axios
      .put(
        `http://localhost:5000/favorites`,
        //`https://sustainable-christmas-server.herokuapp.com/favorites`,
        { userId, tipId },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        getTipDetails();
      });
  }

  const handleDelete = () => {
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
        <div>
          <Link to={`/tips/edit/${tipDetails._id}`}>Edit Tip</Link>
          <button onClick={handleDelete}>Remove Tip</button>
        </div>
      );
    }
  };

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div>
          <h3>{tipDetails.title}</h3>
          <p>By {tipDetails.author.firstName}</p>
          <p>{tipDetails.content}</p>
          <img src={tipDetails.picture} alt={tipDetails.title} />
          {!props.loggedInUser.favorites.includes(tipDetails._id) && (
            <button onClick={addToFavorites}>Add to Favorites</button>
          )}
          {props.loggedInUser.favorites.includes(tipDetails._id) && (
            <p>Is added to favorites</p>
          )}
          {checkIfOwner()}
          {tipDetails.comments &&
            tipDetails.comments.map((item) => (
              <div className='oneComment'>
                <q key={item._id}>{item.content}</q>
              </div>
            ))}
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
    <Redirect to='/login' />
  );
}

export default withRouter(TipDetails);
