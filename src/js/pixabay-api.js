const BASE_URL = 'https://pixabay.com/api';

export const fetchPhotos = searchedQuery => {
  const urlParams = new URLSearchParams({
    key: '45531869-402fff4ce98a39e1a3b7e2442',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: true,
  });

  return fetch(`${BASE_URL}/?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
