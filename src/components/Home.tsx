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
          An app created by <a target="_blank" rel="noreferrer" href='https://ashvin.dev/'>
            Ashvin Nagarajan
          </a>, <a target="_blank" rel="noreferrer" href='https://bryanpan.co/'>
            Bryan Pan
          </a>, and <a target="_blank" rel="noreferrer" href='https://github.com/svathsa/'>
            Suraj Vathsa</a>.
        </div>
      </div>
    </div>
  );
}

export default Home;