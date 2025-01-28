import React, { useEffect, useState } from 'react';
import Header from "../Components/Header";
import {API_OPTIONS  } from "../utils/Constants";


function Browse()
{

    const getNowPlayingMovies = async()=>{

        // try {
        //     const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',
        //         API_OPTIONS)
    
        //         const json = await data.json();
        //         console.log(json, "data")
            
        // } catch (error) {

        //     console.log(error)
            
        // }

        const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTJiNmM2MjFmYzg2OTJhNWYxNGE5NDBlODQ2YjQ1YiIsIm5iZiI6MTczNTIwNDU2MC4wMTgsInN1YiI6IjY3NmQxZWQwZDBiMDhmOTcxODYxM2I3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-jCcHAHm2YljCf2xdPW7B_j0iZRWHnh4NPmlTyYp9kE");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://corsproxy.io/?https://api.themoviedb.org/3/movie/now_playing?page=1", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

        


    }



    useEffect(()=>{
        getNowPlayingMovies()
    },[])
 
    return(
        <div>
            <Header/>
<h1>Browse</h1>
        </div>
    )
}
export default Browse;