import axios from 'axios';
import { getBaseUrl } from '../config/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function createBet(idMatch, scoreTeam1, scoreTeam2, pointsMise) {
  const url = `${BASE_URL}/bet/add`;
  return axios.post(url, {
    idMatch: idMatch,
    scoreTeam1: scoreTeam1,
    scoreTeam2: scoreTeam2,
    pointsMise: pointsMise,
  })
    .then(response => response.data);
}

function getBet() {
  const url = `${BASE_URL}/bet/get`;
  return axios.get(url).then(response => response.data);
}

export { createBet, getBet };
