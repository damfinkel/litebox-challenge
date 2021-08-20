import Button from "../Button";
import styles from './styles.module.scss';
import { useUpload, UPLOAD_STATE, useWindowSize } from "./hooks";
import { useCallback, useState } from "react";
import cn from 'classnames';
import { createMovie } from "../../api/movies";
import UpperFormContainer from "./UpperFormContainer";
import MobileModalTopBar from "../MobileModalTopBar";

const REQUEST_STATE = {
  loading: 'loading',
  success: 'success'
}

function AddMovie({ onClose, onFinishUpload }) {
  const [title, setTitle] = useState("");
  const [requestState, setRequestState] = useState(null);

  const isValidForm = () => textIsValid() && movieImageUrl;
  const textIsValid = () => title?.match(/[a-zA-Z0-9]/);
  
  const { movieImageUrl, uploadingState, uploadProgress, onUploadImage, onReset, setUploadingState } = useUpload();

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
      <MobileModalTopBar onClose={onClose} className={styles.topBar} />
      <button type="button" className={styles.closeButton} onClick={onClose} />
      <form className={styles.addMovieContent} onSubmit={handleUploadMovie}>
        <UpperFormContainer 
          title={title}
          uploadProgress={uploadProgress}
          onChangeTitle={setTitle}
          uploadingState={uploadingState}
          isSuccess={requestState === REQUEST_STATE.success}
          onUploadImage={onUploadImage}
          onClickUploadButton={onClickUploadButton}
          textIsValid={textIsValid} />
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
