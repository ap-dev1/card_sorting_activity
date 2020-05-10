import React from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './components/welcomePage/WelcomePage';
import NewActivityPage from './components/NewActivityPage/NewActivityPage';

function App() {

  return (
    <div className="App">
      {/* <WelcomePage/> */}
      <NewActivityPage/>
    </div>
  );
}

export default App;
