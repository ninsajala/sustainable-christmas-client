import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
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
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
        <li>
          <Link to='/myprofile'>My Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
