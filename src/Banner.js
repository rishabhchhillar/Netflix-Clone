import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        };
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            class='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
                )`,
                backgroundPosition: 'center center',
            }}>
            <div class='banner_contents'>
                <h1 class='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                    {/* ?(optional chaining) is for if the thing is not there, prevents error */}
                </h1>
                <div class='banner_buttons'>
                    <button class='banner_button'>Play</button>
                    <button class='banner_button'>My List</button>
                </div>
                <h1 class='banner_description'>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div class='banner--fadeBottom' />
        </header>
    )
}

export default Banner
