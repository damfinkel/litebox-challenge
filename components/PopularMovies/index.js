import { useState } from 'react';
import { POPULAR_MOVIES } from './utils';
import styles from './styles.module.scss';
import Image from 'next/image';
import PlayButton from '../../public/assets/ic-play-button.svg';
import cn from 'classnames';

function PopularMovies() {
  const [response, setResponse] = useState(POPULAR_MOVIES.results.slice(0, 4));
  const [showPopular, setShowPopular] = useState(false);

  const getMovieCoverPath = (fileName) => `https://image.tmdb.org/t/p/w500${fileName}`;

  const getYear = (movie) => movie.release_date.split('-')[0];

  return (
    <div className={styles.popularMoviesContainer}>
      <button type="button" className={styles.dropdownTitle}>
        Ver: 
        <div className={styles.selectedTitleContainer}>
          <strong className={cn(styles.popularTitle, { [styles.visible]: showPopular })}>Populares</strong>
          <strong className={cn(styles.myMoviesTitle, { [styles.visible]: !showPopular })}>Mis Películas</strong>
        </div>
        <ul className={styles.dropdown}>
          <i className={styles.arrowUp} />
          <li className={cn(styles.dropdownItem, { [styles.selected]: showPopular })}>
            <button type="button" className={styles.dropdownItemButton} onClick={() => setShowPopular(true)}>Populares</button>
          </li>
          <li className={cn(styles.dropdownItem, { [styles.selected]: !showPopular })}>
            <button type="button" className={styles.dropdownItemButton} onClick={() => setShowPopular(false)}>Mis películas</button>
          </li>
        </ul>
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
