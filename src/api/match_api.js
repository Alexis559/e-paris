import axios from 'axios';
import { getBaseUrl } from '../config/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function getPublicMatches() {
  const url = `${BASE_URL}/match/get`;
  return axios.get(url).then(response => response.data);
}

function addMatch(idTeam1, idTeam2, idGame, description, dateMatch) {
  const url = `${BASE_URL}/match/add`;
  return axios.post(url, {
    idTeam1: idTeam1,
    idTeam2: idTeam2,
    idGame: idGame,
    description: description,
    dateMatch: dateMatch,
  })
    .then(response => response.data);
}

function getMatchById(idMatch) {
  const url = `${BASE_URL}/match/get/` + idMatch;
  return axios.get(url).then(response => response.data);
}

function updateResultat(idMatch, scoreTeam1, scoreTeam2){
  const url = `${BASE_URL}/match/result/` + idMatch;
  return axios.post(url, {
    scoreTeam1: scoreTeam1,
    scoreTeam2: scoreTeam2,
  })
    .then(response => response.data);
}

export { getPublicMatches, addMatch, getMatchById, updateResultat };
