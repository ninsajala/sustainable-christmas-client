import React from 'react';
import axios from 'axios';

function RemoveFavorite(props) {
  let userId = props.loggedInUser._id;
  let tipId = props.tipDetails._id;

  function removeFromFavorites() {
    axios
      .put(
        `http://localhost:5000/favorites/remove`,
        //`https://sustainable-christmas-server.herokuapp.com/favorites`,
        { userId, tipId },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        props.updateTip();
        props.checkFavorite();
        console.log('HOI');
      });
  }

  return (
    <button
      className='favoriteButton'
      onClick={removeFromFavorites}
      title='Remove from Favorites'>
      <i className='fas fa-heart'></i>
    </button>
  );
}

export default RemoveFavorite;
