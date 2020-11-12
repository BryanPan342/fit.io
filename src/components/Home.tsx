import React from 'react';

import './styles/Home.scss';

function Home(): JSX.Element {
  return (
    <div id='homeWrapper'>
      <div id="wrapper">
        <div id='title'>
          fit.io
        </div>
        <div id='text'>
          An app created by Ashvin Nagarajan, Bryan Pan, and Suraj Vathsa.
        </div>
        <button id='button' type='button' onClick={()=>console.log('start')}>Start</button>
      </div>
    </div>
  );
}

export default Home;