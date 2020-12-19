import React, { Component } from 'react';
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


class App extends Component {
  state = {
    picture: [],
    search: null,
    showModal: false,
    loading: false,
    error: null,
    largeImage: '',
    altImage: '',
    pageFetch: 1
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetshSearch();
    }
  }

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: largeImageURL,
      altImage: tags
    }));
  };

  formSubmitHendler = ({ search }) => {
    if (search !== this.state.search) {
      this.setState({ picture: [], search, pageFetch: 1 });
    } else { toast.error("Вы уже ввели это имя!"); };
    
  };

  fetshSearch = () => {
    this.setState({ loading: true });
    const { search, pageFetch } = this.state;
    Api.fetchImages(search, pageFetch).then(pictures => this.setState(prevState => (
        { picture: ((this.state.picture === []) ? pictures.hits : ([...prevState.picture, ...pictures.hits])) }
      )))
      .catch(error => (this.setState({error})))
      .finally(() => {
        this.onLoadMoreSkroll();
        this.setState(prevState => ({
          loading: false,
          pageFetch: prevState.pageFetch + 1
        }))
      }); 
  }

  onLoadMoreSkroll = () => {
    if (this.state.pageFetch >= 2) {
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

  render() {
    const {picture, showModal, error, largeImage, pageFetch, search, altImage, loading} = this.state;
    return (
      <div className="App">
        {error && <h1>{error.massage}</h1>}

        <Searchbar onSubmit={this.formSubmitHendler} />

        <ImageGallery
          pictures={picture}
          onClick={this.toggleModal} />
        
        {this.state.loading && <LoaderSpinner />}
        
        {(picture.length !== 0) && (pageFetch >= 2) && <LoadMore onClick={this.fetshSearch} />}

        {search && picture.length === 0 && loading === false && <DefaultNotifeImages />}
        
        {showModal && <Modal onClose={ this.toggleModal }>
          <img src={largeImage} alt={altImage}/>
        </Modal>}
        
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
        />
    </div>
  );
  }
  
}

export default App;
