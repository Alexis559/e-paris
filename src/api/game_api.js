import axios from 'axios';
import { getBaseUrl } from '../auth/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function getGames() {
  const url = `${BASE_URL}/game/get`;
  return axios.get(url).then(response => response.data);
}

function addGame(nameGame, descrGame, dateCreation, imgGame) {
  const url = `${BASE_URL}/game/add`;
  return axios.post(url, {
    nameGame: nameGame,
    descrGame: descrGame,
    dateCreation: dateCreation,
    imgGame: imgGame,
  })
    .then(response => response.data);
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

function getGameByName(nameGame) {
  const url = `${BASE_URL}/game/get/` + nameGame;
  return axios.get(url).then(response => response.data);
}

export { getGames, addGame, getGameByName, createTeam};
