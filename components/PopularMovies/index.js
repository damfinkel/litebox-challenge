import { useState, useRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { useOnClickOutside } from './hooks';
import MovieInformation from './MovieInformation';

function PopularMovies({ popularMovies, myMovies }) {
  const [showPopular, setShowPopular] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));
  const [shownMovieId, setShownMovieId] = useState(null);

  const getPopularMovieCoverPath = (fileName) => `${process.env.NEXT_PUBLIC_TMDB_IMAGE_HOST_URL}/t/p/w500${fileName}`;
  const getMyMovieCoverPath = (fileName) => {
    return fileName
  }

  const handleSelectDropdownOption = (showPopular) => {
    setShownMovieId(null);
    setShowPopular(showPopular);
  }

  return (
    <div className={styles.trendingMoviesContainer}>
      <div ref={dropdownRef} className={styles.dropdownControls}>
        <button className={styles.dropdownTitle} onClick={() => setOpenDropdown(prev => !prev)}>
          Ver:&nbsp;
          <div className={styles.selectedTitleContainer}>
            <strong className={cn(styles.popularTitle, { [styles.visible]: showPopular })}>Populares</strong>
            <strong className={cn(styles.myMoviesTitle, { [styles.visible]: !showPopular })}> Mis Películas</strong>
          </div>
        </button>
        {openDropdown && <ul className={styles.dropdown}>
          <i className={styles.arrowUp} />
          <li className={cn(styles.dropdownItem, { [styles.selected]: showPopular })}>
            <button type="button" className={styles.dropdownItemButton} onClick={() => handleSelectDropdownOption(true)}>Populares</button>
          </li>
          <li className={cn(styles.dropdownItem, { [styles.selected]: !showPopular })}>
            <button type="button" className={styles.dropdownItemButton} onClick={() => handleSelectDropdownOption(false)}>Mis películas</button>
          </li>
        </ul>}
      </div>
      <div className={styles.movieListContainer}>
        <div className={cn(styles.popularMoviesContainer, { [styles.visible]: showPopular })}>
          {popularMovies.map((movie) => (
            <MovieInformation
              key={movie.id}
              movie={movie}
              showMovieDetail={movie.id === shownMovieId}
              onToggleMovieDetail={setShownMovieId}
              imageUrlPath={getPopularMovieCoverPath(movie.poster_path)}
            />
          ))}
        </div>
        <div className={cn(styles.myMoviesContainer, { [styles.visible]: !showPopular })}>
          {myMovies.map((movie) => (
            <MovieInformation
              key={movie.id}
              movie={movie}
              showMovieDetail={movie.id === shownMovieId}
              onToggleMovieDetail={setShownMovieId}
              imageUrlPath={getMyMovieCoverPath(movie.poster_path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularMovies;
