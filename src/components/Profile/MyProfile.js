import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './profile.css';

function MyProfile(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return props.loggedInUser ? (
    <span>
      {loaded ? (
        <div>
          <h4>Welcome {props.loggedInUser.firstName}</h4>
          <h5>My Christmas Tips</h5>
          <div className='profileSection'>
            {props.loggedInUser.tips &&
              props.loggedInUser.tips.map((item) => (
                <p key={item._id}>{item.title}</p>
              ))}
          </div>
          <h5>My Favorites</h5>
          <div className='profileSection'>
            {props.loggedInUser.favorites &&
              props.loggedInUser.favorites.map((item) => (
                <p key={item._id}>{item.title}</p>
              ))}
          </div>
          <h5>My Comments</h5>
          <div className='myProfileSection'>
            {props.loggedInUser.comments &&
              props.loggedInUser.comments.map((item) => (
                <p key={item._id}>{item.content}</p>
              ))}
          </div>
          <Link to='/myprofile/edit'>Edit Profile</Link>
        </div>
      ) : (
        <span>Finding User</span>
      )}
    </span>
  ) : (
    <p>
      Please Log In First:
      <Link to={'/login'}>Login</Link>
    </p>
  );
}

export default MyProfile;
