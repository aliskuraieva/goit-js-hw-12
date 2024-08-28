import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const LoadMoreBtnEl = document.querySelector('.js-load-more');

let currentPage = 1;
let searchedValue = '';
let cardHeight = 0;

const lightBox = new SimpleLightbox('.js-gallery a', {
  overlay: true,
  captionsData: 'alt',
  overlayOpacity: 0.8,
  captionDelay: 250,
  focus: true,
});

function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}

const onSearchFormSubmit = async event => {
  try {
    showLoader();
    event.preventDefault();
    searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPage = 1;
    const response = await fetchPhotos(searchedValue, currentPage);
    console.log(response);

    if (searchedValue === '') {
      iziToast.warning({
        title: 'Caution',
        message: 'Input field must not be empty',
        position: 'topLeft',
      });

      return;
    }
    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
    }
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryEl.innerHTML = galleryCardsTemplate;

    const galleryCardEl = galleryEl.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;

    LoadMoreBtnEl.classList.remove('is-hidden');

    lightBox.refresh();

    const totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      LoadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: 'We are sorry,but you have reached the end of search results',
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
  searchFormEl.reset();
};

const onLoadMoreBtnClick = async event => {
  try {
    showLoader();
    currentPage++;
    const response = await fetchPhotos(searchedValue, currentPage);
    console.log(response);
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    lightBox.refresh();

    const totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      LoadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: 'We are sorry,but you have reached the end of search results',
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
  searchFormEl.reset();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
LoadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
