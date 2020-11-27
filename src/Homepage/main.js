import React from 'react';
import './home.css';
import Typewriter from 'typewriter-effect';
import { defineCustomElements } from 'shooting-stars/dist/loader';
defineCustomElements(window);

function Main() {
  return (
    <main>
      <shooting-stars
        image='../fallingstar.png'
        height="'30px'"
        width='30'
        min-speed='10'
        max-speed='10'
        num='60'
      />
      <h3>How to Celebrate a</h3>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('<h1>Sustainable Christmas ✯</h1>').start();
        }}
      />
    </main>
  );
}

export default Main;
