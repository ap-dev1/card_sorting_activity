import React, { useState } from 'react';
import styled from 'styled-components';

// bring a flexbox with five empty slots; that's it. 

const StyleSelectedCard = styled.div`
    border: 1px solid navy;
    background-color: #D5F5E3;
    height: 50px;
    text-align: center;
    vertical-align: center;
`


const StyleContainerSelected = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    background-color: #ffffff;
    border: 2px solid orange;
    margin-bottom: 15px;
`

const EmptySlots = () => {

    return (

        <StyleContainerSelected>

            <StyleSelectedCard >Honesty</StyleSelectedCard>
            <StyleSelectedCard >Strength</StyleSelectedCard>
            <StyleSelectedCard >Exercise</StyleSelectedCard>
            <StyleSelectedCard >Justice</StyleSelectedCard>
            <StyleSelectedCard >Sleep</StyleSelectedCard>

        </StyleContainerSelected>

        // <div display="flex" flex-direction="row" flex-wrap="nowrap" justify-content="space-between">

        //     <h2 >1</h2>
        //     <h2 >2</h2>
        //     <h2 >3</h2>
        //     <h2 >4</h2>
        //     <h2 >5</h2>

        // </div>
    )
}


export default EmptySlots;