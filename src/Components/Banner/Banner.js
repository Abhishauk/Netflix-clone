import React, { useEffect, useState } from 'react';
import { API_KEY , imageUrl} from '../../Constants/constants';
import axios from 'axios'; 
import './Banner.css';
function Banner(){
  const [movie, setMovie] =  useState()
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
         // Generate a random index within the range of the array
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      
      // Access the movie at the random index
      const randomMovie = response.data.results[randomIndex];
      
      setMovie(randomMovie);
    })
  }, [])
  return (
    <div style ={{backgroundImage:`url(${movie ? imageUrl+ movie.backdrop_path:""})`}}
    className='banner'>
        <div className='content'>
        <h1 className='title'>{movie ? movie.title:""}</h1>
        <div className='banner_buttons'>
            <button className='button'>Play</button>
            <button className='button'>My list</button>
        </div>
        <h1 className='discription'>{movie ?movie.overview:""}</h1>
        </div>
        <div className="fade_bottom"></div>
      
    </div>
  )
  }

export default Banner
