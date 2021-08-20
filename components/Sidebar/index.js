import styles from './styles.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import MobileModalTopBar from '../MobileModalTopBar';
import { useEffect } from 'react';

export const usePreventScroll = ({ open }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);
}

function Sidebar({ open, onClose, onAddMovie }) {
  usePreventScroll({ open });
  
  return (
    <div className={cn(styles.sidebarContainer, { [styles.openSidebar]: open, [styles.closeSidebar]: !open })}>
      <MobileModalTopBar onClose={onClose} className={styles.topBar} />
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
