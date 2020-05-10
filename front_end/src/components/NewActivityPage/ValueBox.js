import React from 'react';
import 'tachyons';

const ValueBox = (props) => {
    return (
        <div className='tc grow bg-light-green br3 pa1 ma2 dib shadow-5 f2 w-65'>
            <h4>{props.description}</h4>
        </div>
    );
}

export default ValueBox;


// import React, { Component } from 'react'
// import styled from 'styled-components'

// const ValueDisplayer = styled.div`
//   border-radius: 10px;
//   background-color: #ffffff;
//   border: 2px solid green;
//   margin-bottom: 15px;
//   padding: 0 20px;
//   h6{
//       margin:10px;
//   }
//   .author{
//       margin-bottom: 5px;
//       margin-top: 15px;
//   }
//   button{
//       margin-bottom: 5px;
//   }
// `


// export default class ValueBox extends Component {
//   render() {
//     return (
//       <ValueDisplayer>
//         <h1>{this.props.value}</h1>
//       </ValueDisplayer>
//     )
//   }
// }
