import Button from "../Button";
import styles from './styles.module.scss';
import { useDropzone } from 'react-dropzone'
import { useUpload, UPLOAD_STATE, useWindowSize } from "./hooks";
import { useCallback, useState } from "react";
import cn from 'classnames';
import { createMovie } from "../../api/movies";
import Logo from '../../public/assets/ic-liteflix.svg';

const REQUEST_STATE = {
  loading: 'loading',
  success: 'success'
}

function AddMovie({ onClose, onFinishUpload }) {
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState();
  const [requestState, setRequestState] = useState(null);

  const textIsValid = () => title?.match(/[a-zA-Z0-9]/);
  const isValidForm = () => textIsValid() && movieImageUrl;
  
  const { movieImageUrl, uploadingState, uploadProgress, onUploadImage, onReset, setUploadingState } = useUpload();
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onUploadImage, accept: 'image/jpeg, image/png' });
  const { width } = useWindowSize();

  const isMobile = () => width < 1024;

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setTouched(true);
  }

  const onClickUploadButton = useCallback(() => {
    onReset();
  }, [onReset])

  const handleUploadMovie = useCallback(async (event) => {
    event.preventDefault();

    if (REQUEST_STATE.success) {
      onFinishUpload();
    }

    setRequestState(REQUEST_STATE.loading);
    const response = await createMovie({ imageUrl: movieImageUrl, title });
    if (response.status === 201) {
      setRequestState(REQUEST_STATE.success);
    } else {
      setRequestState(null);
      setUploadingState(UPLOAD_STATE.error);
    }
  }, [movieImageUrl, onFinishUpload, setUploadingState, title])

  return (
    <div className={styles.addMovieContainer}>
      <button type="button" className={styles.closeButton} onClick={onClose} />
      <form className={styles.addMovieContent} onSubmit={handleUploadMovie}>
        <div className={styles.upperFormContainer}>
          <div className={cn(styles.successContainer, { [styles.hidden]: requestState !== REQUEST_STATE.success })}>
            <Logo className={styles.logo} />
            <h2 className={styles.successTitle}>¡Felicitaciones!</h2>
            <h3 className={styles.successSubtitle}>{title} fue correctamente subida.</h3>
          </div>
          <div className={cn(styles.preRequestContainer, { [styles.hidden]: requestState === REQUEST_STATE.success })}>
            <h2 className={styles.addImageTitle}>Agregar película</h2>
            {uploadingState === UPLOAD_STATE.initial && (
              <div className={styles.imageUploader} {...getRootProps()}>
                <input {...getInputProps()}  />
                <label className={styles.uploadImageLabel}>Agregá un archivo{!isMobile() && ' o arrastralo y soltalo aquí'}</label>
              </div>
            )}
            {uploadingState !== UPLOAD_STATE.initial && (
              <div className={styles.uploadingContainer}>
                <span className={styles.uploadProgressTitle}>
                  {uploadingState === UPLOAD_STATE.uploading && <>Cargando <strong>{uploadProgress}%</strong></>}
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
          </div>
        </div>
        <div className={styles.formBottomContainer}>
          <div className={cn(styles.buttonSuccessContainer, { [styles.hidden]: requestState !== REQUEST_STATE.success })}>
            <Button buttonStyle="terciary" onClick={onClose}>Ir a Home</Button>
          </div>
          <div className={cn(styles.buttonPreRequestContainer, { [styles.hidden]: requestState === REQUEST_STATE.success })}>
            <Button 
              type="submit" 
              buttonStyle="terciary" 
              disabled={!isValidForm()} 
              loading={requestState}
              className={styles.submitButton}
              onClick={handleUploadMovie}>
                Subir película
            </Button>
            <Button 
              type="button" 
              buttonStyle="secondary" 
              disabled={requestState}
              className={styles.bottomCloseButton}
              onClick={onClose}>
                Salir
            </Button>
          </div>
        </div>
      </form>
    </div> 
  )
}

export default AddMovie;
