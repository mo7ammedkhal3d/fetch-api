import React,{Fragment,useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Spinner from './components/UI/Spinner';

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsloading] = useState(false);
  const [error,setError] = useState(null);

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const fetchMoviesHandler = async () =>{
    setIsloading(true);
    try{
      const response = await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('Something went wrong!');   
      }
      const data = await response.json();
  
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message);
    }
    setIsloading(false);
  };

  return (
    <Fragment>
      {isLoading && <Spinner/>}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </Fragment>
  );
}

export default App;
