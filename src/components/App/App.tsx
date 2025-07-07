import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { fetchMovies } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader'


function App() {
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSearch = (text: string) => {
    setError(false)
    setLoading(true)
    
    fetchMovies(text)
      .then(data => {
        if (data.length === 0) {toast.error('No movies found for your request.');}
        setMovies(data)
      })
      .catch(()=>setError(true))
      .finally(() => setLoading(false))
  }

 
function handleSelectMovie(movie: Movie) {
  setSelectedMovie(movie);
}

function handleCloseModal() {
  setSelectedMovie(null);
}

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      
      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
  
      {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
)}

    </>
  )
}

export default App
