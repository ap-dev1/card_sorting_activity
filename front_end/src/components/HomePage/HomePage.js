import React, { useState } from "react";
import axios from "axios";

const HomePage =  (props) => {
  const [authStatus, setAuthStatus] = useState(0);


  const authenticate = async () => {
    try{
      const authenticationResult = await axios({
        method: "post",
        url: "http://127.0.0.1:3001/auth/tokenAuthenticate",
        data: {
          authorizationName: `${props.match.params.user}`,
          token: `${props.match.params.sessionId}`,
        },
        crossDomain: true,
      });
      console.log("result",authenticationResult)
      setAuthStatus(authenticationResult.data.status)
    }
    catch(err){
      console.log("Err in homepage authentication", JSON.stringify(err))
    }
  };
  authenticate();



// Declare the function to be called when clicking the button.
// Because we're using "Router", we have access to history, which
// is an object with multiple methods. It keeps track of the current
// URL and where you've been (browsing wise).


const startActivity = () => {

  //history is a prop provided by the router, in App.js, render ()

 

  props.history.push(`${props.match.url}/NewActivityPage`)}




  if (authStatus === 0){
    return (
      <div>Loading HOME PAGE!</div>
    )
  }


  else if (authStatus == 200){
    return (
      <div>
          <div>Congrats. Now what? </div>
          <button onClick={startActivity}>New Activity</button>
      </div>
    )
  }



  else if(authStatus == 440){
    return (
      <div>Session Expired! Please re-login</div>
    )
  }



  else if(authStatus == 401){
    return (
      <div>"Get OUT!"</div>
    )
  }


};

export default HomePage;
