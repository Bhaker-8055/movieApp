import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {searchMovies, fetchMovies} from "../redux/features/movieSlice"
import './Nevbar.css'

function Nevbar() {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    function changeHandler(event) {
        const queryString = event.target.value;
        setQuery(queryString);
      }
      
    function sublitHandler(event){
        event.preventDefault();
        (!query) ? (dispatch(fetchMovies())) : (dispatch(searchMovies(query)))
        // dispatch(searchMovies(query));
        setQuery('');
    }

  return (
    <div className="nev-container">
      <div className="nev-text"><h2>MOVIE NAME</h2></div>

      <div className="form-container">
        <form className='nev-form' onSubmit={sublitHandler}>
            <input type="text" className='nev-input' value={query} onChange={changeHandler}></input>
            <button className='nev-btn'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Nevbar
