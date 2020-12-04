import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function MyProfile(props) {
  const [user, setUser] = useState(props.loggedInUser);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/user/${user._id}`
        //'https://sustainable-christmas-server.herokuapp.com/tips'
      )
      .then((foundUser) => {
        setUser(foundUser.data);
      });
  }, [user._id]);

  return props.loggedInUser ? (
    <div>
      <h4>Welcome {user.firstName}</h4>
      {user.comments &&
        user.comments.map((item) => <p key={item._id}>{item.content}</p>)}
      {user.favorites &&
        user.favorites.map((item) => <p key={item._id}>{item.title}</p>)}
      {user.tips && user.tips.map((item) => <p key={item._id}>{item.title}</p>)}
      <Link to='/myprofile/edit'>Edit Profile</Link>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default MyProfile;
