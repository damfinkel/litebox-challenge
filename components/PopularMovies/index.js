import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import PlayButton from '../../public/assets/ic-play-button.svg';
import cn from 'classnames';
import { useOnClickOutside } from './hooks';
import { useEffect } from 'react';

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

  const getYear = (movie) => movie.release_date?.split('-')[0];
  const showMovieDetail = (movieId) => shownMovieId === movieId;

  const handleSelectDropdownOption = (showPopular) => {
    setShownMovieId(null);
    setShowPopular(showPopular);
  }  

  return (
    <div className={styles.trendingMoviesContainer}>
      <div ref={dropdownRef} className={styles.dropdownControls}>
        <button className={styles.dropdownTitle} onClick={() => setOpenDropdown(prev => !prev)}>
          Ver: 
          <div className={styles.selectedTitleContainer}>
            <strong className={cn(styles.popularTitle, { [styles.visible]: showPopular })}>Populares</strong>
            <strong className={cn(styles.myMoviesTitle, { [styles.visible]: !showPopular })}>Mis Películas</strong>
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
            <div key={movie.id} className={cn(styles.moviePreviewContainer, { [styles.showInfo]: showMovieDetail(movie.id) })} onClick={() => setShownMovieId(movie.id)}>
              <Image src={getPopularMovieCoverPath(movie.poster_path)} alt={movie.title} className={styles.movieCover} layout="fill" objectFit="cover" />
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
        <div className={cn(styles.myMoviesContainer, { [styles.visible]: !showPopular })}>
          {myMovies.map((movie) => (
            <div key={movie.id} className={cn(styles.moviePreviewContainer, { [styles.showInfo]: showMovieDetail(movie.id) })} onClick={() => setShownMovieId(movie.id)}>
              <Image src={getMyMovieCoverPath(movie.poster_path)} unoptimized alt={movie.title} className={styles.movieCover} layout="fill" objectFit="cover" />
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.hoveredInformation}>
                <button type="button" className={styles.playButton}>
                  <PlayButton className={styles.playIcon}/>
                  {movie.title}
                </button>
                <span className={cn(styles.rating, { [styles.visible]: movie?.vote_average })}>{movie?.vote_average}</span>
                <span className={styles.year}>{getYear(movie)}</span>
              </div>
              <div className={styles.overlay} /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularMovies;
