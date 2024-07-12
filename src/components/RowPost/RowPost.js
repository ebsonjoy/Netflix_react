import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY } from '../../constants/constants'
function RowPost(props) {
  const [movies,setMovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url)
    .then(response =>{
      console.log(response);
      setMovies(response.data.results)
    })
    .catch(err=>{alert('Nework Error')})
  },[props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = async (id) => {
    try {
      const response = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        console.log('Trailer not found for this movie.');
        // alert('Trailer not found for this movie.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Trailer not available. 404 Error.');
        // alert('Trailer not available for this movie.');
      } else {
        console.error('An unexpected error occurred:', error);
        // alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj,index)=>(
            <img onClick={()=>handleMovie(obj.id)} key={index} className={props.isSmall ? 'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>
          ))}
           
        </div>
        {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost