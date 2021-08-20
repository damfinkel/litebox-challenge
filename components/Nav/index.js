import { useEffect, useState } from 'react';
import Logo from '../../public/assets/ic-liteflix.svg';
import styles from './styles.module.scss'
import cn from 'classnames';

const useWindowScroll = () => {
  const [scroll, setScroll] = useState({ scrollX: null, scrollY: null });

  useEffect(() => {
    const onScroll = () => {
      const scroll = { scrollX: window.scrollX, scrollY: window.scrollY };
      setScroll(scroll);
    }
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scroll;
}

function Nav({ onOpenSidebar, onAddMovie }) {
  const { scrollY } = useWindowScroll();

  const shouldChangeNavBackground = () => scrollY > 100;

  return (
    <nav className={cn(styles.nav, { [styles.opaque]: shouldChangeNavBackground() })}>
      <div className={styles.logoContainer}>
        <Logo />
        <button type="button" className={styles.addMovieButton} onClick={onAddMovie}>Agregar Película</button>
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
