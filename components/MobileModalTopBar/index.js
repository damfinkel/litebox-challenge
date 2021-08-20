import Logo from '../../public/assets/ic-liteflix.svg';
import styles from './styles.module.scss';
import cn from 'classnames';

function MobileModalTopBar({ onClose, className }) {
  return (
    <div className={cn(styles.topContainer, className)}>
      <button type="button" className={styles.closeButton} onClick={onClose} />
      <div className={styles.rightContent}>
        <button type="button" className={styles.notificationsButton} />
        <button type="button" className={styles.profileButton} />
      </div>
      <Logo className={styles.logo} />
    </div>
  )
}

export default MobileModalTopBar;
