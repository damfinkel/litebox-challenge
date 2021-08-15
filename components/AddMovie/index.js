import Button from "../Button";
import styles from './styles.module.scss';
import { useDropzone } from 'react-dropzone'
import { useUpload, UPLOAD_STATE } from "./hooks";
import { useCallback, useState } from "react";
import cn from 'classnames';

function AddMovie({ onClose }) {
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState();

  const textIsValid = () => title?.match(/[a-zA-Z0-9]/);
  const isValidForm = () => textIsValid() && movieImageUrl;
  
  const { movieImageUrl, uploadingState, uploadProgress, onUploadImage, onReset } = useUpload();
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onUploadImage });

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setTouched(true);
  }

  const onClickUploadButton = useCallback(() => {
    if (uploadingState === UPLOAD_STATE.error) {
      onReset();
    }

    if (uploadingState === UPLOAD_STATE.uploading) {
      // cancel
    }
  }, [uploadingState])
  
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
      {uploadingState !== UPLOAD_STATE.initial && (
        <div className={styles.uploadingContainer}>
          <span className={styles.uploadProgressTitle}>
            {uploadingState === UPLOAD_STATE.uploading && <>Cargando <strong>{uploadProgress}</strong></>}
            {uploadingState === UPLOAD_STATE.error && <><strong>¡Error! </strong>No se pudo cargar la película</>}
            {uploadingState === UPLOAD_STATE.uploaded && <strong>100% cargado</strong>}
          </span>
          <div className={styles.emptyProgressLine}>
            <div 
              className={cn(styles.progressLine, { 
                [styles.uploadError]: uploadingState === UPLOAD_STATE.error
              })} 
              style={{ width: `${uploadProgress}%` }} 
            />
          </div>
          <button type="button" className={cn(styles.cancelButton, { 
            [styles.ready]: uploadingState === UPLOAD_STATE.uploaded 
          })} onClick={onClickUploadButton}>
            {uploadingState === UPLOAD_STATE.uploading && 'Cancelar'}
            {uploadingState === UPLOAD_STATE.error && 'Reintentar'}
            {uploadingState === UPLOAD_STATE.uploaded && '¡Listo!'}
          </button>
        </div>  
      )}
      <div className={styles.titleInputContainer}>
        <input type="text" className={styles.titleInput} placeholder="Título" onChange={onChangeTitle} />
        <span className={cn(styles.titleInputError, { [styles.visible]: !textIsValid() && touched && title.length })}>Sólo letras o números</span> 
      </div>
      <Button buttonStyle="terciary" disabled={!isValidForm()}>Subir película</Button>
    </form>
  )
}

export default AddMovie;
