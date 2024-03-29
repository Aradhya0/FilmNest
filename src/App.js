import {useState, useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=47c1e162';
// const movie1 = {
  
//     "Title": "The Amazing Spiderman 2 Webb Cut",
//     "Year": "2021",
//     "imdbID": "tt18351128",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"

// }
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Superman');
  },[])

  const handleKey = (e)=>{
    if(e.key==='Enter'){
      searchMovies(searchTerm)
    }
  }
  return (
    
    <div className="app">
      <h1>FilmNest</h1>
      <div className="search">
        <input
        placeholder="Search what you want to watch"
        value={searchTerm}
        tabIndex={0}
        onKeyDown={handleKey}
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
         {movies.map((movie) => (
          <MovieCard movie={movie} />
         ))}
        </div>
          ) : (
            <div className="empty">
              <h2>We are sorry. We currently Don't have the movie you are searching for. </h2>
            </div>
          )
        }
        
      </div>
    );   
}
export default App;
  

