import axios from 'axios';
import ApiBaseUrls from '../constants/ApiBaseUrls';

export const getMarsPhotos = () => {
  return axios({
    method: 'get',
    url: `${ApiBaseUrls.nasaBaseUrl}/rovers/curiosity/photos`,
    params: {
      api_key: 'dFjUeNrh1b6YNReeIge8M7dbigSLdhPHx9kJdlzM',
      sol: 1000,
    },
  }).then((response) => {
    return response.data.photos
  });
};
