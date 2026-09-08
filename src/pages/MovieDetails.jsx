import React from 'react'
import { useParams,Link } from 'react-router-dom'
const MovieDetails = () => {
const {id} = useParams();
  return (
    <div>
      Movie details page for movie ID: {id}
    </div>
  )
}

export default MovieDetails
