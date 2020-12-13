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
      localStorage.removeItem(`user`);
      setLoggedInUser(null);
      props.getUser(null);
    });
  };

  const checkLoggedIn = (loggedInUser) => {
    if (loggedInUser) {
      return (
        <NavLink activeClassName='activeLink' to='/' onClick={logoutUser}>
          Logout
        </NavLink>
      );
    } else {
      return <NavLink to='/signup'>Sign Up</NavLink>;
    }
  };

  const checkLoggedIn2 = (loggedInUser) => {
    if (loggedInUser) {
      return <NavLink to='/myprofile'>My Profile</NavLink>;
    } else {
      return <NavLink to='/login'>Login</NavLink>;
    }
  };

  return (
    <header className='fixed-top'>
      <h4>Sustainable Christmas</h4>
      <nav className='menu'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/tips'>Christmas Tips</NavLink>
        <NavLink to='/recipes'>Recipes</NavLink>
        <NavLink to='/charity'>Charity</NavLink>
        {checkLoggedIn(loggedInUser)}
        {checkLoggedIn2(loggedInUser)}
        <PlayMusic />
      </nav>
    </header>
  );
}

export default Nav;
