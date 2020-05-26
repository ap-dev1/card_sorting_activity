import React from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

console.log("pula mea")

 const principles = axios({
          method: "post",
          url: "http://127.0.0.1:3001/NewActivityPage",
          crossDomain: true})

console.log("wtf")



const AllCards = (props) => {

  // const principles = [Power", "Compassion", "Money"]

  const principleBoxes = principles.map((principle)=>{
    return <CardTemplate value={principle}/>
  })

    return (
      <div>
        {principleBoxes}
      </div>
    )
  }





export default AllCards