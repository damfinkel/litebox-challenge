import '../styles/globals.css'
import Modal from 'react-modal'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if(typeof window !== 'undefined') {
      Modal.setAppElement('body');
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
