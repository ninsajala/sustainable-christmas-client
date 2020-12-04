import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

function MyProfile(props) {
  useEffect(() => {
    console.log(props.loggedInUser);
  }, []);

  return props.loggedInUser ? (
    <div>
      <h4>{props.loggedInUser.firstName}</h4>
      <Link to='/myprofile/edit'>Edit Profile</Link>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default MyProfile;
