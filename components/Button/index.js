import styles from './styles.module.scss';
import cn from 'classnames';

function Button({ className, buttonStyle, children, ...buttonProps }) {
  return (
    <button type="button" className={cn(styles.button, styles[buttonStyle], className)} {...buttonProps}>{children}</button>
  )
}

export default Button;
