import React, { Component } from 'react'

export default class WelcomePage extends Component {
  render() {
    return (
      <div>
        <label>
          User Name
        </label>
        <input placeholder='User Name'/>

        <label>
          Password
        </label>
        <input placeholder='Password'/>
      </div>
    )
  }
}
