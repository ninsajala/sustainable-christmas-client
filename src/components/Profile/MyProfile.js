import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteListItem from './FavoriteListItem';
import './profile.css';
import TipsListItem from './TipsListItem';

function MyProfile(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return props.loggedInUser ? (
    <div className='profileWrapper'>
      {loaded ? (
        <div className='userProfile'>
          <div className='userInfo'>
            {props.loggedInUser.picture ? (
              <div
                className='profilePicture'
                style={{
                  backgroundImage: `url(${props.loggedInUser.picture})`,
                }}></div>
            ) : (
              <div
                className='profilePicture'
                style={{
                  backgroundImage: `url('../../images/default-profile.jpg')`,
                }}></div>
            )}
            <div className='userInfoRight'>
              <h4>Welcome {props.loggedInUser.firstName}</h4>
              {props.loggedInUser.about && (
                <div className='about'>
                  <h5>About:</h5>
                  <p>{props.loggedInUser.about}</p>
                </div>
              )}
            </div>
          </div>
          <h5>My Christmas Tips</h5>
          <div className='profileSection'>
            {props.loggedInUser.tips.length <= 0 && (
              <div>
                <p>No tips added yet</p>
                <Link to='/tips/add'>
                  <button
                    className='btn btn-warning'
                    title='Go to addition form'>
                    Add a Tip
                  </button>
                </Link>
              </div>
            )}
            {props.loggedInUser.tips &&
              props.loggedInUser.tips.map((item) => (
                <TipsListItem item={item} key={item._id} />
              ))}
          </div>
          <h5>My Favorites</h5>
          <div className='profileSection'>
            {props.loggedInUser.favorites.length <= 0 && (
              <div>
                <p>No favorites yet</p>
                <Link to='/tips'>
                  <button className='btn btn-warning' title='Go to Tips'>
                    View Articles
                  </button>
                </Link>
              </div>
            )}
            {props.loggedInUser.favorites &&
              props.loggedInUser.favorites.map((item) => (
                <FavoriteListItem item={item} key={item._id} />
              ))}
          </div>
          <Link to='/myprofile/edit'>
            <button className='btn btn-warning'>Edit Profile</button>
          </Link>
        </div>
      ) : (
        <p>Finding User</p>
      )}
    </div>
  ) : (
    <p className='logInWarning'>
      Please log in to see this page <br />
      <Link to={'/login'}>
        <button className='btn btn-warning'>Login</button>
      </Link>
    </p>
  );
}

export default MyProfile;
