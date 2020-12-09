import React from 'react';
import axios from 'axios';

function AddFavorite(props) {
  let userId = props.loggedInUser._id;
  let tipId = props.tipDetails._id;

  function addToFavorites() {
    axios
      .put(
        `https://sustainable-christmas-server.herokuapp.com/favorites/add`,
        { userId, tipId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        props.getUser(response.data);
        props.updateTip();
        props.checkFavorite();
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
