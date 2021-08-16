import styles from './styles.module.scss';
import cn from 'classnames';
import Loading from '../Loading';

function Button({ className, buttonStyle, children, loading, ...buttonProps }) {
  return (
    <button type="button" className={cn(styles.button, styles[buttonStyle], className)} {...buttonProps}>
      {loading ? <Loading /> : children}
    </button>
  )
}

export default Button;
