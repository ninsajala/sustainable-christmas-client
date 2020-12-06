import React from 'react';
import axios from 'axios';

function AddFavorite(props) {
  function addToFavorites() {
    let userId = props.loggedInUser._id;
    let tipId = props.tipDetails._id;

    axios
      .put(
        `http://localhost:5000/favorites`,
        //`https://sustainable-christmas-server.herokuapp.com/favorites`,
        { userId, tipId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        props.updateTip();
      });
  }

  return (
    <button
      className='favoriteButton'
      onClick={addToFavorites}
      title='Add to Favorites'>
      <i className='far fa-heart'></i>
    </button>
  );
}

export default AddFavorite;
