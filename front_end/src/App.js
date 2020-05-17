import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import WelcomePage from './components/welcomePage/WelcomePage';
import NewActivityPage from './components/NewActivityPage/NewActivityPage';
import HomePage from './components/HomePage/HomePage';

function App() {

  const WelcomePageWrapper = (props) =>(
    <WelcomePage {...props}/>
  )

  const HomePageWrapper = (props) => (
    <HomePage {...props}/>
  )

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={WelcomePageWrapper}/>
        <Route exact path="/:user/:sessionId" render={HomePageWrapper}/>
      </Switch>
    </Router>
  );
}

export default App;
