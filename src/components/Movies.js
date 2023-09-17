import React from 'react'
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

function Movies() {

    const movies = useSelector((state)=>{return state.movieSlice.movies});
    

  return (
    <div className=" w-screen " style={{backgroundColor:"#F3F5F6"}}>
      {movies.length>0 &&
        movies.map((movie)=>{
            return(<MovieCard movie = {movie} id={movie.id}/>)
        })
      }
    </div>
  )
}

export default Movies
