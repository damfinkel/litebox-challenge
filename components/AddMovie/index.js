import Button from "../Button";
import styles from './styles.module.scss';

function AddMovie({ onClose }) {
  return (
    <form className={styles.addMovieContainer}>
      <button type="button" className={styles.closeButton} onClick={onClose} />
      <h2 className={styles.addImageTitle}>Agregar película</h2>
      <div className={styles.imageUploader} />
      <input type="text" className={styles.titleInput} placeholder="Título" />
      <Button buttonStyle="terciary" disabled>Subir película</Button>
    </form>
  )
}

export default AddMovie;
