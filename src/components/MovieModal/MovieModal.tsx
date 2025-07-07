import css from './MovieModal.module.css'
import type { Movie } from '../../types/movie'
import { useEffect } from 'react'

interface MovieModalProps {
  movie: Movie,
  onClose: () => void,
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    }
  }, [onClose]);

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
    <div className={css.modal} >
    <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className={css.image}
    />
    <div className={css.content}>
        <h2>{ movie.title}</h2>
      <p>{ movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
    </div>
  </div>
</div>
}