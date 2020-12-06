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
      .delete(`http://localhost:5000/tips/${tipDetails._id}`)
      .then(() => props.history.push(`/tips`));
  };

  const checkIfOwner = () => {
    if (tipDetails.author === props.loggedInUser._id) {
      return (
        <div>
          <Link to={`/tip/edit/${tipDetails._id}`}>Edit Tip</Link>
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
          <button onClick={addToFavorites}>Add to Favorites</button>
          {checkIfOwner}
          {tipDetails.comments &&
            tipDetails.comments.map((item) => (
              <p key={item._id}>{item.content}</p>
            ))}
          <Comment tip={tipDetails._id} user={props.loggedInUser._id} />
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
