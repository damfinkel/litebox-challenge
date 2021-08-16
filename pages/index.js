import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Nav from '../components/Nav';
import PopularMovies from '../components/PopularMovies';
import Button from '../components/Button';
import Image from 'next/image';
import { POPULAR_MOVIES, POPULAR_MOVIES2 } from './utils';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Modal from 'react-modal';
import AddMovie from '../components/AddMovie';

export default function Home({ coverMovie, popularList }) {
  const getMovieCoverPath = (fileName) => `https://image.tmdb.org/t/p/original${fileName}`;
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => setModalIsOpen(false);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Liteflix</title>
        <meta name="description" content="Las mejores películas y series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.overlay} />
      <Sidebar open={showSidebar} onOpenChange={setShowSidebar} />
      <Nav onOpenSidebar={setShowSidebar} onAddMovie={() => setModalIsOpen(true)} />
      <main className={styles.main}>
        <Image src={getMovieCoverPath(coverMovie?.poster_path)} alt={coverMovie?.title} layout="fill" objectFit="cover" className={styles.coverImage} />
        <div className={styles.mainContent}>
          <div className={styles.coverMovieOuterContainer}>
            <div className={styles.coverMovieInnerContainer}>
              <h2 className={styles.liteflixOriginal}>Original de <strong>Liteflix</strong></h2>
              <h1 className={styles.coverMovieTitle}>{coverMovie?.original_title}</h1>
              <div className={styles.buttonActionContainer}>
                <Button buttonStyle="primary" className={styles.playButton}>Reproducir</Button>
                <Button buttonStyle="secondary" className={styles.myListButton}>Mi Lista</Button>
              </div>
            </div>
          </div>
          <PopularMovies />
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterClose={closeModal}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <AddMovie onClose={closeModal} />
      </Modal>
    </div>
  )
}

export async function getServerSideProps() {
  // In a real project I'd move the apiKey to a env variable
  // const coverMovieResponse = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20');
  // const mostPopularMovie = coverMovieResponse?.json()?.results?.[0];
  const mostPopularMovie = POPULAR_MOVIES.results[0];

  // const popularListResponse = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20');
  // const popularList = popularListResponse.json()?.results?.slice?.(0, 4);
  const popularList = POPULAR_MOVIES2.results.slice?.(0, 4);

  return {
    props: {
      coverMovie: mostPopularMovie || null,
      popularList: popularList || null
    }
  }
}
