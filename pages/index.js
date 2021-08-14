import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Nav from '../components/Nav';

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
      </main>
    </div>
  )
}
