import React, { useState } from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

const AllCards = (props) => {

  // const [principles, setPrinciples] = useState([])

  // const testRequestAxios = async () => {
  //   const axiosResponse = await axios({
  //     method: "post",
  //     url: "http://127.0.0.1:3001/resources/defaultCards",
  //     crossDomain: true
  //   })

  //   const destructuredResponse = Object.entries(axiosResponse.data);
  //   // const destructuredResponse = [{
  //   //   "ACCEPTANCE": "to be accepted as I am",
  //   //   "ACCURACY": "to be accurate in my opinions and beliefs",
  //   //   "ACHIEVEMENT": "to have important accomplishments",
  //   //   "ADVENTURE": "to have new and exciting experiences"}
  //   // ]
  //   setPrinciples(destructuredResponse)
  //   console.log("principles:", principles);
  //   console.log("Axios Response: ", axiosResponse)
  // }

  // testRequestAxios();
  const principles = ["Faake", "Faker", "Fakest"]

  const principleBoxes = principles.map((principle) => {
    return <CardTemplate value={principle} />
  })

  return (
    <div>
      {principleBoxes}
    </div>
  )
}

export default AllCards