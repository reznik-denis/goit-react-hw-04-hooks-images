import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Modal from './Components/Modal/Modal';
import LoadMore from './Components/LoadMore/LoadMore';
import Api from './services/FetchImages';
import LoaderSpinner from './Components/Loader/Loader';
import DefaultNotifeImages from './Components/DefaultNotifeImages/DefaultNotifeImages';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [picture, setPicture] = useState([]);
  const [search, setSearch] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [altImage, setAltImage] = useState('');
  const [pageFetch, setPageFetch] = useState(1);

  useEffect(() => {
    if (search !== null && search !== '')
    fetshSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImage(largeImageURL);
    setAltImage(tags);
  };

  const formSubmitHendler = (userSearch) => {
    if (userSearch !== search) {
      setPicture([]);
      setSearch(userSearch);
      setPageFetch(1);
    } else { toast.error("Вы уже ввели это имя!"); };
  };

  const fetshSearch = () => {
    setLoading(true);
    Api.fetchImages(search, pageFetch).then(pictures => {
      setPicture(prevState => (picture === []) ? pictures.hits : ([...prevState, ...pictures.hits]))
    }).catch(error => setError(error))
      .finally(() => {
        onLoadMoreSkroll();
        setLoading(false);
        setPageFetch(state => state + 1)
      }); 
  }

  const onLoadMoreSkroll = () => {
    if (pageFetch >= 2) {
      const options = {
        top: null,
        behavior: 'smooth',
      };

      options.top = window.pageYOffset + document.documentElement.clientHeight;
      setTimeout(() => {
        window.scrollTo(options);
      }, 1000);
    }
  };
    
  return (
      <div className="App">
        {error && <h1>{error.massage}</h1>}

        <Searchbar onSubmit={formSubmitHendler} />

        <ImageGallery
          pictures={picture}
          onClick={toggleModal} />
        
        {loading && <LoaderSpinner />}
        
        {(picture.length !== 0) && (pageFetch >= 2) && <LoadMore onClick={fetshSearch} />}

        {search && picture.length === 0 && loading === false && <DefaultNotifeImages />}
        
        {showModal && <Modal onClose={ toggleModal }>
          <img src={largeImage} alt={altImage}/>
        </Modal>}
        
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
        />
    </div>
  );
}

export default App;
