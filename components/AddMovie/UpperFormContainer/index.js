import { useState } from 'react';
import cn from 'classnames';
import Logo from '../../../public/assets/ic-liteflix.svg';
import styles from './styles.module.scss';
import { UPLOAD_STATE, useWindowSize } from "../hooks";
import { useDropzone } from 'react-dropzone'

// TODO: I'd insist in refactoring this, maybe using context to avoid prop drilling
function UpperFormContainer({ title, uploadProgress, onUploadImage, onChangeTitle, uploadingState, isSuccess, onClickUploadButton, textIsValid }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onUploadImage, accept: 'image/jpeg, image/png' });
  const [touched, setTouched] = useState();

  const handleChangeTitle = (e) => {
    onChangeTitle(e.target.value);
    setTouched(true);
  }

  const { width } = useWindowSize();
  const isMobile = () => width < 1024;

  return (
    <div className={styles.upperFormContainer}>
      <div className={cn(styles.successContainer, { [styles.hidden]: !isSuccess })}>
        <Logo className={styles.logo} />
        <h2 className={styles.successTitle}>¡Felicitaciones!</h2>
        <h3 className={styles.successSubtitle}>{title} fue correctamente subida.</h3>
      </div>
      <div className={cn(styles.preRequestContainer, { [styles.hidden]: isSuccess })}>
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
          <input type="text" className={styles.titleInput} placeholder="Título" onChange={handleChangeTitle} />
          <span className={cn(styles.titleInputError, { [styles.visible]: !textIsValid() && touched && title.length })}>Sólo letras o números</span> 
        </div>
      </div>
    </div>
  )
}

export default UpperFormContainer;
