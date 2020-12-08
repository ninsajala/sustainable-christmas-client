import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './layout.css';
import PlayMusic from './PlayMusic';

function Nav(props) {
  const [loggedInUser, setLoggedInUser] = useState(props.loggedInUser);
  const service = new AuthService();

  useEffect(() => {
    setLoggedInUser(props.loggedInUser);
  }, [props.loggedInUser]);

  const logoutUser = () => {
    service.logout().then(() => {
      setLoggedInUser(null);
      props.getUser(null);
    });
  };

  const checkLoggedIn = (loggedInUser) => {
    if (loggedInUser) {
      return (
        <span>
          <NavLink to='/myprofile'>My Profile</NavLink>
          <NavLink activeClassName='activeLink' to='/' onClick={logoutUser}>
            Logout
          </NavLink>
        </span>
      );
    } else {
      return (
        <span>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
        </span>
      );
    }
  };

  return (
    <header className='fixed-top'>
      <h4>Sustainable Christmas ✯</h4>
      <nav>
        <div className='menu'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/tips'>Christmas Tips</NavLink>
          <NavLink to='/recipes'>Recipes</NavLink>
          <NavLink to='/charity'>Charity</NavLink>
          {/*
        <li>
          <NavLink to='/music'>Music</NavLink>
        </li>
        <li>
          <NavLink to='/gifts'>Gifts</NavLink>
        </li>*/}

          {checkLoggedIn(loggedInUser)}
        </div>
      </nav>
      <PlayMusic />
    </header>
  );
}

export default Nav;
