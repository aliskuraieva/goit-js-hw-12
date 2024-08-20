import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}

showLoader();
setTimeout(hideLoader, 2000);

function onSearch(event) {
  event.preventDefault();
  const searchedValue = searchFormEl.elements.user_query.value;

  if (searchedValue === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Input field must not be empty',
      position: 'topLeft',
    });
    return;
  }

  fetchPhotos(searchedValue)
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomRight',
        });
        galleryEl.innerHTML = '';

        return;
      }
      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join('');
      galleryEl.innerHTML = galleryCardsTemplate;

      const lightBox = new SimpleLightbox('.js-gallery a', {
        overlay: true,
        captionsData: 'alt',
        overlayOpacity: 0.8,
        captionDelay: 250,
        focus: true,
      });
      lightBox.refresh();
      searchFormEl.reset();
    })
    .catch(err => {
      console.log(err);
    });
}
searchFormEl.addEventListener('submit', onSearch);
