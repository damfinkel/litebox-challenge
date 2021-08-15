import Button from "../Button";
import styles from './styles.module.scss';
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from "react";

const UPLOAD_STATE = {
  initial: 'initial',
  uploading: 'uploading',
  error: 'error',
  uploaded: 'uploaded'
}

function AddMovie({ onClose }) {
  const [movieImage, setMovieImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [uploadingState, setUploadingState] = useState(UPLOAD_STATE.initial);

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    setUploadingState(UPLOAD_STATE.uploading);
    setTimeout(() => {
      setUploadingState(movieImage ? UPLOAD_STATE.uploaded : UPLOAD_STATE.error);
    }, 115000);
  }, [movieImage]);

  const isValidForm = () => {
    return title?.match(/[a-zA-Z]/) && movieImage;
  }
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });
  
  return (
    <form className={styles.addMovieContainer}>
      <button type="button" className={styles.closeButton} onClick={onClose} />
      <h2 className={styles.addImageTitle}>Agregar película</h2>
      {uploadingState === UPLOAD_STATE.initial && (
        <div className={styles.imageUploader} {...getRootProps()}>
          <input {...getInputProps()}  />
          <label className={styles.uploadImageLabel}>Agregá un archivo o arrastralo y soltalo aquí</label>
        </div>
      )}
      {uploadingState === UPLOAD_STATE.uploading && (
        <div className={styles.uploadingContainer}>
          <span className={styles.uploadProgressTitle}>Cargando <strong>40%</strong></span>
          <div className={styles.emptyProgressLine}>
            <div className={styles.progressLine} />
          </div>
          <button type="button" className={styles.cancelButton}>Cancelar</button>
        </div>  
      )}
      <input type="text" className={styles.titleInput} placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
      <Button buttonStyle="terciary" disabled={!isValidForm()}>Subir película</Button>
    </form>
  )
}

export default AddMovie;
