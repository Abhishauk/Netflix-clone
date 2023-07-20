import React, { useEffect,useState } from 'react'
import Youtube from 'react-youtube';
import './RowPost.css';
import {API_KEY , imageUrl } from '../../Constants/constants';
import axios from 'axios';
function RowPost(props){
  const [movies,setMovies] = useState([])
  const [urlid,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log("dfvf");
      console.log(response.data);
      setMovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    console.log(id);
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('Array empty');
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>

        <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':"poster"} alt='poster' src={`${imageUrl+obj.backdrop_path}`}  />
)}
        
      </div>
    { urlid && <Youtube opts={opts} videoId={urlid.key} />}
    </div>
  )
}

export default RowPost
