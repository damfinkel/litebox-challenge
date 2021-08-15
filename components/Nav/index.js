import Link from 'next/link'
import Logo from '../../public/assets/ic-liteflix.svg';
import styles from './styles.module.scss'

function Nav({ onOpenSidebar }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Logo />
        <Link href="/movie/new"><a className={styles.addMovieButton}>Agregar Película</a></Link>
      </div>
      <div className={styles.navButtonsContainer}>
        <button type="button" className={styles.sidebarButton} onClick={() => onOpenSidebar(prev => !prev)} />
        <button type="button" className={styles.notificationsButton} />
        <button type="button" className={styles.profileButton} />
      </div>
    </nav>
  )
}

export default Nav;
