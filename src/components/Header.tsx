import React, { useContext } from 'react';
import { FirebaseClassContext } from './App';
import './styles/Header.scss';

function Header(): JSX.Element {
  const _firebase = useContext(FirebaseClassContext);
  const signOut = () => {
    void _firebase.signOut().then(() => {
      window.location.replace('/');
    });
  };
  return (
    <div id='header'>
      <button id='signout' onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Header;
