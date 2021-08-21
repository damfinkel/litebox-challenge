import Image from "next/image";
import { useContext, useState, useRef } from 'react';
import cn from 'classnames';

import PlayButton from '../../../public/assets/ic-play-button.svg';
import styles from './styles.module.scss';
import { HomeContext } from '../../../contexts';
import { useOnClickOutside } from "../hooks";

function MovieInformation({ movie, showMovieDetail, onToggleMovieDetail, imageUrlPath }) {
  const { placeholderImage } = useContext(HomeContext);
  const [imageSrc, setImageSrc] = useState(imageUrlPath);
  const ref = useRef();
  useOnClickOutside(ref, () => onToggleMovieDetail(null))

  const getYear = (movie) => movie.release_date?.split('-')[0];

  return (
    <div ref={ref} key={movie.id} className={cn(styles.moviePreviewContainer, { [styles.showInfo]: showMovieDetail })} onClick={() => onToggleMovieDetail(movie.id)}>
      <Image src={imageSrc} 
        alt={movie.title}
        className={styles.movieCover}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={placeholderImage}
        onError={() => setImageSrc(placeholderImage)}
      />
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
  )
}

export default MovieInformation;
