import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import Axios from "axios"

import React from 'react'

function Recipe({ recipe }) {
  console.log("RECIPE:", recipe)

  return (
    <div className="mt-20">
      <Card>
          <img src={recipe.image} alt={recipe.title}/>
          <h4>{recipe.title}</h4>
      </Card>
    </div>
  )
}

export default Recipe



const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    max-height: 300px; /* Ensure the image doesn't exceed the container height */
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
grid-gap: 2rem;
margin: 0 auto; /* Center the grid horizontally */
max-width: 1200px; /* Set a maximum width for the grid */
margin-top: 20px; /* Adjust the value as needed */
`;

const PopularPicksHeader = styled.h1`
margin-top: 40px;
  font-size: 1.5rem; /* Adjust the font size as needed */
  font-weight: bold;
  text-align: left;
  margin-left: 100px;
`;