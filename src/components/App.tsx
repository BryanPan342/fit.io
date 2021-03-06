import React, { useState, useEffect, useContext, createContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { _Firebase } from '../utils/firebase';

import Error from './404';
import Header from './Header';
import Home from './Home';
import Upload from './Upload';

import './styles/App.scss';

// If in production, use the environment variable defined as below; otherwise,
// use the development proxy.
export const endpoint = process.env.NODE_ENV === 'production'
                ? 'https://heroku'
                : 'https://localhost:5000/';

console.log(endpoint);

export const FirebaseClassContext = createContext(new _Firebase());

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);
  const _firebase = useContext(FirebaseClassContext);

  useEffect(() => {
    _firebase.load(
      () => {
        setIsSignedIn(true);
      },
      () => {
        setIsSignedIn(false);
      },
    );
  }, []);

  if (isSignedIn === undefined) {
    return (
      <div id='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div id="authWrapper">
        <div className="text" id="signIn">
          {' '}
          Sign In{' '}
        </div>
        <StyledFirebaseAuth
          uiConfig={_firebase.uiConfig()}
          firebaseAuth={_firebase.auth()}
        />
      </div>
    );
  }

  return (
    <FirebaseClassContext.Provider value={_firebase}>
      <div className="app">
        <Header />
        <Router>
          {/* <Switch>
            <Route exact path="/" render={Home} />
            <Route render={Error} />
          </Switch> */}
        </Router>
        <div id="homeWrapper">
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
            <Upload />
          </div>
        </div>
      </div>
    </FirebaseClassContext.Provider>
  );
}
