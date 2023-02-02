import { useState, useEffect } from 'react';
import './App.css'
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=a9ca24c8'

const movie1 = {
    "Title": "Spirited Away",
    "Year": "2020",
    "imdbID": "tt6480224",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjE5ZTc2OWItNTE4Ni00ODA0LWE4ZjYtODIzZThmZDNkZWNlXkEyXkFqcGdeQXVyNzA1NDAzMDE@._V1_SX300.jpg"

}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spirited Away');
    }, []);

    return (
        <div className="app">
            <h1>Filmtown</h1>

            <div className="search">
                <input
                    placeholder='Search for a film'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                    />
            </div>

            {
                movies?.length > 0
                    ? (
                    <div className='container'>
                    {movies.map((movie) => <MovieCard movie={ movie } />
                    )}
                    </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        
        </div>
    );
};

export default App;