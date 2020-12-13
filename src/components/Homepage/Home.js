import React from 'react';
import './home.css';
import Typewriter from 'typewriter-effect';
import { defineCustomElements } from 'shooting-stars/dist/loader';
defineCustomElements(window);

function Home() {
  return (
    <section className='Homepage'>
      <shooting-stars
        image='../images/fallingstar.png'
        height="30px"
        width='30px'
        min-speed='5'
        max-speed='5'
        num='100'
      />
      <h3>How to celebrate...</h3>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('<h1>Christmas ✯</h1>').start();
        }}
      />
      <h3 className='second'>...in a sustainable way</h3>
    </section>
  );
}

export default Home;
