import React from 'react';
import './layout.css';

function Footer() {
  return (
    <footer className='fixed-bottom'>
      <span>
        This page was coded by{' '}
        <a href='https://github.com/ninsajala' target='_blank' rel='noreferrer'>
          <b>Nina</b>
        </a>{' '}
        as final project for Ironhack - 2020
      </span>
    </footer>
  );
}

export default Footer;
