import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/assets/ic-liteflix.svg';
import styles from './styles.module.scss'

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} width={113} height={34} src={logo} alt="Liteflix" />
        <Link href="/movie/new"><a className={styles.addMovieButton}>Agregar Película</a></Link>
      </div>
      <div className={styles.navButtonsContainer}>
        <button type="button" className={styles.sidebarButton} />
        <button type="button" className={styles.notificationsButton} />
        <button type="button" className={styles.profileButton} />
      </div>
    </nav>
  )
}

export default Nav;
