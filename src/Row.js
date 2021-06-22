import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); //need to add the prop which is coming from outside useEffect in the []

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch(error => console.log(error));
        }
    };

    return (
        <div class='row'>
            <h2>{title}</h2>

            <div class='row_posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id} //fater loading; doesn't re render the entire row
                        onClick={() => handleClick(movie)}
                        class={`row_poster ${isLargeRow && "row_posterLarge"}`} //Eveything gets row_poster but if isLargeRow, extra class is added
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
