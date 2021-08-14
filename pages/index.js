import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Nav from '../components/Nav';
import PopularMovies from '../components/PopularMovies';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Liteflix</title>
        <meta name="description" content="Las mejores películas y series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.coverMovieOuterContainer}>
            <div className={styles.coverMovieInnerContainer}>
              <h2 className={styles.liteflixOriginal}>Original de <strong>Liteflix</strong></h2>
              <h1 className={styles.coverMovieTitle}>La casa de papel</h1>
              <div className={styles.buttonActionContainer}>
                <Button buttonStyle="primary" className={styles.playButton}>Reproducir</Button>
                <Button buttonStyle="secondary" className={styles.myListButton} />
              </div>
            </div>
          </div>
          <PopularMovies />
        </div>
      </main>
    </div>
  )
}
