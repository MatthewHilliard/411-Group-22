import Axios from 'axios'
import { useEffect, useState } from 'react';
import styled from "styled-components"

function Favorites({ user, favoritesList, setFavoritesList }) {
  const localStorageFavorites = localStorage.getItem('favoritesList')

  // can set globally within app if want to use elsewhere
  // const [favoritesList, setFavoritesList] = useState([])

  function listFavorites() {
    if (!localStorageFavorites) {
      // Send "get" request using Axios to the backend and sets favoritesList to its data returned back
      Axios.get('http://localhost:3000/users/getFavorites',
        {
          params: {
            user
          }
        })
        .then((response) => {
          console.log(response)
          // Need to get favorites
          setFavoritesList(response.data)
          // update `recipe` (aka `parsedData`) in localStorage
          localStorage.setItem('favoritesList', JSON.stringify(response.data))
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        })
    }
  }

  function removeFavorite(response){
    Axios.delete("http://localhost:3000/users/removeFavorite", {
      params: {
        user,
        response
      }
    })
    .then((response) => {
      console.log("Removed from favorited recipes")
    })
    .catch((error) => {
      console.error('Error removing favorite:', error);
    })
  }

  useEffect(() => {
    console.log("user", user)
    listFavorites()
  }, [])

  const favoritesDisplayList = favoritesList.map((element, index) => (
    <Grid key={element.id}>
      <Card>
        <h4>{element.title}</h4>
        <img className="h-64" src={element.image}/>
        <button className="pl-14 pt-2" onClick={() => removeFavorite(element)}>Remove from Favorites</button>
      </Card>
    </Grid>
  ))

  return (
    <div>
      <h1 className="text-5xl text-center pt-5"> Your Favorites </h1>
      <Grid>
        { /* console.log(favoritesList) */}
        {favoritesDisplayList}
      </Grid>
    </div>
  )
}

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    width: 100%;
    max-height: 100%; /* Ensure the image doesn't exceed the container height */
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`
const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
grid-gap: 2rem;
margin: 0 auto; /* Center the grid horizontally */
max-width: 1200px; /* Set a maximum width for the grid */
margin-top: 20px; /* Adjust the value as needed */
`

const PopularPicksHeader = styled.h1`
margin-top: 40px;
  font-size: 1.5rem; /* Adjust the font size as needed */
  font-weight: bold;
  text-align: left;
  margin-left: 100px;
`

export default Favorites