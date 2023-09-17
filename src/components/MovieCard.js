import React from 'react'
import { myConfig as config } from "../config";
import './MovieCard.css'

function MovieCard({movie}) {
    const imageBaseUrl = config.imageBaseUrl;
  return (
    <div className='movie-container'>
      <div className='container-left '>
        {
          !movie.poster_path ? (
            <div className='noPoster'><p className=' text-lg '>Image Not Found</p></div>
          ) : (
            <img alt={movie.title} src={`${imageBaseUrl}${movie.poster_path}`}  />
          )
        }
      </div>
      <div className='container-right flex flex-col'>

        <div><h1 className=' font-extrabold '>{movie.title}</h1></div>

        <div><p className="movie-text">Release Date: {movie.release_date}</p></div>

        <div><p className="movie-text">Rating: {movie.vote_average}</p></div>

        <div><p className='movie-overview'>{movie.overview}</p></div>
        
      </div>
    </div>
  )
}

export default MovieCard
