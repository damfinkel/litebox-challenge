import { useState } from 'react';
import { POPULAR_MOVIES } from './utils';
import styles from './styles.module.scss';
import Image from 'next/image';
import PlayButton from '../../public/assets/ic-play-button.svg';

function PopularMovies() {
  const [response, setResponse] = useState(POPULAR_MOVIES.results.slice(0, 4));

  const getMovieCoverPath = (fileName) => `https://image.tmdb.org/t/p/w500${fileName}`;

  const getYear = (movie) => movie.release_date.split('-')[0];

  return (
    <div className={styles.popularMoviesContainer}>
      <button type="button" className={styles.dropdownTitle}>
        Ver: 
        <strong>Populares</strong>
      </button>
      <div className={styles.movieListContainer}>
        {response.map((movie) => (
          <div key={movie.id} className={styles.moviePreviewContainer}>
            <Image src={getMovieCoverPath(movie.poster_path)} alt={movie.title} className={styles.movieCover} layout="fill" objectFit="cover" />
            <h3 className={styles.movieTitle}>{movie.title}</h3>
            <div className={styles.hoveredInformation}>
              <button type="button" className={styles.playButton}>
                <PlayButton className={styles.playIcon}/>
                {movie.title}
              </button>
              <span className={styles.rating}>{movie.vote_average}</span>
              <span className={styles.year}>{getYear(movie)}</span>
            </div>
            <div className={styles.overlay} /> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularMovies;
