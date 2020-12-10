import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import OtherProfileTipList from './OtherProfileTipList';

function OtherProfile(props) {
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState({});
  const { params } = props.match;
  let myID;
  let otherUserId;

  function getUserData() {
    axios
      .get(
        `https://sustainable-christmas-server.herokuapp.com/user/${params.id}`
      )
      .then((response) => {
        setUserData(response.data);
        setLoaded(true);
      });
  }

  useEffect(getUserData, [params.id]);

  function followUser() {
    myID = props.loggedInUser._id;
    otherUserId = userData._id;

    axios
      .put(
        `https://sustainable-christmas-server.herokuapp.com/follow`,
        {
          myID,
          otherUserId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        props.getUser(response.data.updatedUser1);
        setUserData(response.data.updatedUser2);
      });
  }

  function unFollowUser() {
    myID = props.loggedInUser._id;
    otherUserId = userData._id;

    axios
      .put(
        `https://sustainable-christmas-server.herokuapp.com/unfollow`,
        {
          myID,
          otherUserId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        props.getUser(response.data.updatedUser1);
        setUserData(response.data.updatedUser2);
      });
  }

  function checkFollowing() {
    if (userData.followers.includes(props.loggedInUser._id)) {
      return (
        <button className='btn btn-warning' onClick={unFollowUser}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button className='btn btn-warning' onClick={followUser}>
          Follow
        </button>
      );
    }
  }

  return userData ? (
    <div className='profileWrapper'>
      {loaded ? (
        <div className='userProfile'>
          <h4>{userData.firstName}'s Profile</h4>
          <div className='userInfo'>
            <div className='pictureWrap'>
              {!userData.picture ? (
                <div className='profilePicture Alt'></div>
              ) : (
                <div
                  className='profilePicture'
                  style={{
                    backgroundImage: `url(${userData.picture})`,
                  }}></div>
              )}
            </div>

            <div className='about'>
              <h5>
                About {userData.firstName} {userData.lastName}:
              </h5>
              {userData.about && <p>{userData.about}</p>}
              <div className='followSection'>
                {checkFollowing()}{' '}
                <p>
                  Followed by <b>{userData.followers.length}</b>
                </p>
              </div>
            </div>
          </div>
          <h5>Tips written by {userData.firstName}</h5>
          <div className='profileSection'>
            {userData.tips ? (
              userData.tips.map((item) => (
                <OtherProfileTipList item={item} key={item._id} />
              ))
            ) : (
              <div>
                <p>No tips added yet</p>
              </div>
            )}
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

export default withRouter(OtherProfile);
