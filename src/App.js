import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovies} from "./redux/features/movieSlice"
import { useEffect } from 'react';
import Movies from './components/Movies';
import Nevbar from './components/Nevbar';
import Spinner from './components/Spinner';


function App(){

   const dispatch = useDispatch();

   const isLoading = useSelector((state)=>{return (state.movieSlice.loading)});

   useEffect(() => {
    dispatch(fetchMovies())
   },[]);

  return (
    <div className="App ">
      <Nevbar/>
      {
        isLoading === true ? (<Spinner/>) : (<Movies/>)
      }
      {/* <Movies/> */}
    </div>
  );
}

export default App;
