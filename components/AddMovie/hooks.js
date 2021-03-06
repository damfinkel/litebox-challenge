import { useCallback, useEffect, useRef, useState } from "react";
import { uploadToBucket, getFileContent } from "../../config/s3";

export const UPLOAD_STATE = {
  initial: 'initial',
  uploading: 'uploading',
  error: 'error',
  uploaded: 'uploaded'
}

export const useUpload = () => {
  const [movieImageUrl, setMovieImageUrl] = useState(undefined);
  const [uploadingState, setUploadingState] = useState(UPLOAD_STATE.initial);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressRef = useRef(0);
  const progressInterval = useRef();

  const onUploadImage = useCallback(async acceptedFiles => {
    setUploadingState(UPLOAD_STATE.uploading);

    const file = acceptedFiles[0];

    progressInterval.current = setInterval(() => {
      if (progressRef.current === 90) {
        // If image didn't upload, stop the progress bar until it does
        return;
      }

      progressRef.current = progressRef.current + 5;
      setUploadProgress(prev => prev + 5);
    }, 250);
    try {
      const fileContent = await getFileContent(file);
      const fileUrl = await uploadToBucket({ filename: file.name, fileContent, type: file.type });

      if (UPLOAD_STATE.uploading && progressInterval.current) {
        setMovieImageUrl(fileUrl);
        setUploadingState(UPLOAD_STATE.uploaded);
      }
    } catch (e) {
      setUploadingState(UPLOAD_STATE.error);
    }
  }, []);

  useEffect(() => {
    if (uploadingState === UPLOAD_STATE.uploaded || uploadingState === UPLOAD_STATE.error) {
      clearInterval(progressInterval.current);
      setUploadProgress(100);
    }
  }, [uploadProgress, uploadingState]);

  const onReset = () => {
    setUploadingState(UPLOAD_STATE.initial)
    clearInterval(progressInterval.current);
    progressInterval.current = null;

    setMovieImageUrl(undefined);
    setUploadProgress(0);
    progressRef.current = 0;
  }

  return { movieImageUrl, uploadingState, uploadProgress, onUploadImage, onReset, setUploadingState };
}

export const useWindowSize = () => {
  const [size, setWindowSize] = useState({ width: undefined, height: undefined });

  const onResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
