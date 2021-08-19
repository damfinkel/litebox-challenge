import styles from './styles.module.scss';
import Link from 'next/link';
import cn from 'classnames'
import Logo from '../../public/assets/ic-liteflix.svg';

function Sidebar({ open, onOpenChange, onAddMovie }) {
  return (
    <div className={cn(styles.sidebarContainer, { [styles.openSidebar]: open, [styles.closeSidebar]: !open })}>
      <div className={styles.topContainer}>
        <button type="button" className={styles.closeButton} onClick={() => onOpenChange(false)} />
        <div className={styles.rightContent}>
          <button type="button" className={styles.notificationsButton} />
          <button type="button" className={styles.profileButton} />
        </div>
        <Logo className={styles.logo} />
      </div>
      <ul className={styles.linkContainer}>
        <li className={styles.link}><Link href="/"><a>Inicio</a></Link></li>
        <li className={styles.link}><Link href="/"><a>Series</a></Link></li>
        <li className={styles.link}><Link href="/"><a>Agregadas recientemente</a></Link></li>
        <li className={styles.link}><Link href="/"><a>Populares</a></Link></li>
        <li className={styles.link}><Link href="/"><a>Mis Películas</a></Link></li>
        <li className={styles.link}><Link href="/"><a>Mi Lista</a></Link></li>
        <button className={styles.addMovieButton} onClick={onAddMovie}>Agregar Película</button>
        <button className={styles.logoutButton}>Cerrar Sesión</button>
      </ul>
    </div>
  )
}

export default Sidebar;
