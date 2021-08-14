import { useState } from 'react';
import { POPULAR_MOVIES } from './utils';
import styles from './styles.module.scss';
import Image from 'next/image';

function PopularMovies() {
  const [response, setResponse] = useState(POPULAR_MOVIES.results.slice(0, 4));

  const getMovieCoverPath = (fileName) => `https://image.tmdb.org/t/p/w500${fileName}`;

  return (
    <div className={styles.popularMoviesContainer}>
      <button type="button" className={styles.dropdownTitle}>
        Ver: 
        <strong>Populares</strong>
      </button>
      <div className={styles.movieListContainer}>
        {response.map((movie) => (
          <div key={movie.id} className={styles.moviePreviewContainer}> 
            <Image src={getMovieCoverPath(movie.poster_path)} width={220} height={146} alt={movie.title} className={styles.movieCover} layout="fill" objectFit="cover" className={styles.coverImage} />
            <h3 className={styles.movieTitle}>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularMovies;
