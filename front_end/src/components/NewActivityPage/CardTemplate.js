import React, { Component } from 'react'
import styled from 'styled-components'


const ValueDisplayer = styled.div`
  border-radius: 2px;
  background-color: #ffffff;
  border: 1px solid green;
  margin: 5px;
  padding: 5px 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  h3 {
      margin:5px;
      font-size: 1.2rem;

  }
  .author{
      margin-bottom: 5px;
      margin-top: 15px;
  }


`


export default class CardTemplate extends Component {

  addCard = () => {
    this.props.cardSelector(this.props.id)
  }

  hideCard = () => {
    this.props.cardRemover(this.props.id)
  }

  
  render() {
    return (
      <ValueDisplayer>
        <button className='buttonsCard' onClick={()=>this.addCard()} >Add</button>
        <button className='buttonsCard hide' onClick={()=>this.hideCard()} >Hide</button>

        <h3>{this.props.value}</h3>
        
      </ValueDisplayer>
    )
  }
}
