
import { useState } from 'react';
import styles from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (text: string) => void,
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  
  
  const [text, setText] = useState('')
  
  function  handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = text.trim();
    if (!query) { toast.error('Please enter your search query.'); return} else {
      onSubmit(query);
      setText('');
  }
  }


  return <header className={styles.header}>
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
          autoFocus
          value={text}
onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
      </form>
      <Toaster position="top-right" />
  </div>
</header>
}