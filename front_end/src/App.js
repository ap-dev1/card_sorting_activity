import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import WelcomePage from './components/welcomePage/WelcomePage';
import NewActivityPage from './components/NewActivityPage/NewActivityPage';
import HomePage from './components/HomePage/HomePage';

function App() {



    const WelcomePageWrapper = (props) =>(
        <WelcomePage {...props}/>   )


    const HomePageWrapper = (props) => (
        <HomePage {...props}/>  )


    const ActivityPageWrapper = (props) => (
        <NewActivityPage {...props}/>  )


    // const NewUserPageWrapper = (props) => (
    //     <NewUserPage {...props}/>  )
    

    return (
        <Router>
            <Switch>

                <Route exact path="/" render={WelcomePageWrapper}/>

                <Route exact path="/:user/:sessionId" render={HomePageWrapper}/>

                <Route exact path="/:user/:sessionId/NewActivityPage" render={ActivityPageWrapper}/>

                {/* <Route exact path="/CreateAccount" render={NewUserPageWrapper}/> */}

            </Switch>
        </Router>
  );
}

export default App;
