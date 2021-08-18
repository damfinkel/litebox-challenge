import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Nav from '../components/Nav';
import PopularMovies from '../components/PopularMovies';
import Button from '../components/Button';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Modal from 'react-modal';
import AddMovie from '../components/AddMovie';
import { getCoverMovie, getMyMovies, getPopularMovies } from '../api/movies';

const getLastNElements = (array, n) => {
  return array?.slice(Math.max(array.length - n, 0)) || [];
}

export default function Home({ coverMovie, popularList, initialMyMovies }) {
  const getMovieCoverPath = (fileName) => `${process.env.NEXT_PUBLIC_TMDB_IMAGE_HOST_URL}/t/p/original${fileName}`;
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [myMovies, setMyMovies] = useState(initialMyMovies);

  const closeModal = () => setModalIsOpen(false);

  const updateMyMovies = async () => {
    const movies = await getMyMovies();
    setMyMovies(getLastNElements(movies, 4));
  }
  
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
          <PopularMovies popularMovies={popularList} myMovies={myMovies} />
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterClose={closeModal}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <AddMovie onClose={closeModal} onFinishUpload={updateMyMovies} />
      </Modal>
    </div>
  )
}

export async function getServerSideProps() {
  // TODO: what happens if there's no popular movie or requets fails?
  const [mostPopularMovie, popularList, myMovies] = await Promise.all([getCoverMovie(), getPopularMovies(), getMyMovies()])

  return {
    props: {
      coverMovie: mostPopularMovie || null,
      popularList: popularList || null,
      initialMyMovies: myMovies || null
    }
  }
}
