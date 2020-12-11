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
          <h4>Welcome {props.loggedInUser.firstName}</h4>
          <div className='userInfo'>
            <div className='pictureWrap'>
              <div
                className='profilePicture'
                style={{
                  backgroundImage: `url(${props.loggedInUser.picture})`,
                }}></div>
            </div>
            <div className='about'>
              <h5>About:</h5>
              {props.loggedInUser.about && <p>{props.loggedInUser.about}</p>}
              <p>
                You're followed by {props.loggedInUser.followers.length} users
              </p>
              <Link to='/myprofile/edit'>
                <button className='btn btn-warning'>Edit Profile</button>
              </Link>
              <Link to='/tips/add'>
                <button className='btn btn-warning' title='Go to addition form'>
                  Add a Tip
                </button>
              </Link>
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
          <h5>Following</h5>
          <div className='profileSection'>
            {props.loggedInUser.following.length <= 0 && (
              <div>
                <p>You're not following anyone yet</p>
              </div>
            )}
            {props.loggedInUser.following &&
              props.loggedInUser.following.map((item) => (
                <div className='listItem' key={item._id}>
                  <Link to={`/profile/${item._id}`}>
                    <article className='oneListItem followingListItem'>
                      <img src={item.picture} alt={item.firstName} />
                      <h4>
                        {item.firstName} {item.lastName}
                      </h4>
                    </article>
                  </Link>
                </div>
              ))}
          </div>
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
