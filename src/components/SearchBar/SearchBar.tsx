
import styles from './SearchBar.module.css';
import toast, {Toaster} from 'react-hot-toast';

interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  async function handleAction(formData: FormData) {
    const query = formData.get('query')?.toString().trim();
    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }
    action(formData); // або action(query) — залежить від твого `App.tsx`
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster position="top-right" />
      </div>
    </header>
  );
}