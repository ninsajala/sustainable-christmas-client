import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

function MyProfile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${props.loggedInUser._id}`
        //'https://sustainable-christmas-server.herokuapp.com/tips'
      )
      .then((foundUser) => {
        setUser(foundUser.data);
      });
  }, [props.loggedInUser._id]);

  return props.loggedInUser ? (
    <span>
      {user ? (
        <div>
          <h4>Welcome {user.firstName}</h4>
          <h5>My Christmas Tips</h5>
          <div className='profileSection'>
            {user.tips &&
              user.tips.map((item) => <p key={item._id}>{item.title}</p>)}
          </div>
          <h5>My Favorites</h5>
          <div className='profileSection'>
            {user.favorites &&
              user.favorites.map((item) => <p key={item._id}>{item.title}</p>)}
          </div>
          <h5>My Comments</h5>
          <div className='myProfileSection'>
            {user.comments &&
              user.comments.map((item) => <p key={item._id}>{item.content}</p>)}
          </div>
          <Link to='/myprofile/edit'>Edit Profile</Link>
        </div>
      ) : (
        <span>Finding User</span>
      )}
    </span>
  ) : (
    <Redirect to='/login' />
  );
}

export default MyProfile;
