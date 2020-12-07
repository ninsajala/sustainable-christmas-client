import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './layout.css';
//import ReactAudioPlayer from 'react-audio-player';
//import soundUrl from '../../sound/JingleBellsKevinMacLeod.mp3';
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
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
          <Link to='/myprofile'>My Profile</Link>
        </span>
      );
    } else {
      return (
        <span>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </span>
      );
    }
  };

  return (
    <header className='fixed-top'>
      <h4>Sustainable Christmas ✯</h4>
      <nav>
        <div className='menu'>
          <Link to='/'>Home</Link>
          <Link to='/recipes'>Recipes</Link>
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
          <Link to='/tips'>Christmas Tips</Link>
          {checkLoggedIn(loggedInUser)}
        </div>
        <PlayMusic />
      </nav>
    </header>
  );
}

export default Nav;
