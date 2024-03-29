import axios from 'axios';
import { getBaseUrl } from '../config/config';

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

function getGameById(idGame) {
  const url = `${BASE_URL}/game/get/` + idGame;
  return axios.get(url).then(response => response.data);
}

export { getGames, addGame, getGameById  };
