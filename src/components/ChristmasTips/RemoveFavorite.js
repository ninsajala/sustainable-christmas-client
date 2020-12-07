import React from 'react';
import axios from 'axios';

function RemoveFavorite(props) {
  function removeFromFavorites() {
    let userId = props.loggedInUser._id;
    let tipId = props.tipDetails._id;

    axios
      .put(
        `http://localhost:5000/favorites/remove`,
        //`https://sustainable-christmas-server.herokuapp.com/favorites`,
        { userId, tipId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        props.updateTip();
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
