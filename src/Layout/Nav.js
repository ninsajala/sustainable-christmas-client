import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setLoggedInUser(props.loggedInUser);
  }, [props.loggedInUser]);

  const checkLoggedIn = (loggedInUser) => {
    if (loggedInUser !== null) {
      return (
        <span>
          <li>
            <Link to='/logout'>Logout</Link>
          </li>
          <li>
            <Link to='/myprofile'>My Profile</Link>
          </li>
        </span>
      );
    } else {
      return (
        <span>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
        </span>
      );
    }
  };

  return (
    <nav>
      <ul className='navbar'>
        Sustainable Christmas ✯
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/recipes'>Recipes</Link>
        </li>
        {/*
        <li>
          <Link to='/music'>Music</Link>
        </li>
        <li>
          <Link to='/gifts'>Gifts</Link>
        </li>
        <li>
          <Link to='/donate'>Donate</Link>
        </li> */}
        <li>
          <Link to='/articles'>Christmas Tips</Link>
        </li>
        {checkLoggedIn(loggedInUser)}
      </ul>
    </nav>
  );
}

export default Nav;
