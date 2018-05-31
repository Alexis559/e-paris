import axios from 'axios';
import { getBaseUrl } from '../config/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function getTeams() {
  const url = `${BASE_URL}/team/get/`;
  return axios.get(url).then(response => response.data);
}


function getTeamGame(idGame) {
  const url = `${BASE_URL}/team/get/` + idGame;
  return axios.get(url).then(response => response.data);
}

function createTeam(nameTeam, dateCreation, imgUrl, idGame) {
  const url = `${BASE_URL}/team/add`;
  return axios.post(url, {
    nameTeam: nameTeam,
    dateCreation: dateCreation,
    imgUrl: imgUrl,
    idGame: idGame,
  })
    .then(response => response.data);
}

export { getTeamGame, createTeam, getTeams };
