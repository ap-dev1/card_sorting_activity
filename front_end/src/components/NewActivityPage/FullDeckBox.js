import React, { Component } from 'react'
import ValueBox from './ValueBox'

export default class FullDeckBox extends Component {
  principles = [
    "Power",
    "Compassion",
    "Money"
  ]
  render() {
    return (
      <div>
        {this.principles.map((currentPrinciple)=>{
          return <ValueBox value={currentPrinciple}/>
        })}
      </div>
    )
  }
}
