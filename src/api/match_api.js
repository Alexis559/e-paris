import axios from 'axios';
import { getBaseUrl } from '../auth/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function getPublicMatches() {
  const url = `${BASE_URL}/match/get`;
  return axios.get(url).then(response => response.data);
}

export { getPublicMatches };
