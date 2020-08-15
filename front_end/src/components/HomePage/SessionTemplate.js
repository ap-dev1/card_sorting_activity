import React, { Component } from 'react'
import styled from 'styled-components'


// const SessionDisplayer = styled.div`
//     border-radius: 5px;
//     border: 1px solid #060429;
//     background: #ebffc4;

//     margin: 10px;
//     width: 150px;
//     height:200px;


//     h6 {
//         padding: 5px;
//         background: #022241;
//         color: #61dafb; 
//         font-size: 12px;
//         text-align: center;
//     }

//     text {
//         padding: 5px;
        
//         padding:2px;
//         font-size: 14px;
//         color: #022241;
//     }
//   `


export default class SessionTemplate extends Component {
  
  render() {
    return (
    //   <SessionDisplayer>
    //     <h6 id='timestamp'>{this.props.timestamp}</h6>
    //     <h6 id='cards'>{this.props.cards}</h6>
    //   </SessionDisplayer>

    <div className="sessionCard">
        <text className="timeStamp" id="timestamp">{this.props.timestamp}</text>
        <text className="pastSelections" id="cards">{this.props.cards}</text>
    </div>

    )
  }
}
