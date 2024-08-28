import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhotos = (searchedQuery, page) => {
  const axiosOptions = {
    params: {
      key: '45531869-402fff4ce98a39e1a3b7e2442',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };
  return axios.get(`/`, axiosOptions);
};
