import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

function getPublicMatches() {
  const url = `${BASE_URL}/api/match/get`;
  return axios.get(url).then(response => response.data);
}

function getGames() {
  const url = `${BASE_URL}/api/game/get`;
  return axios.get(url).then(response => response.data);
}

function getUser(login, password) {
  const url = `${BASE_URL}/api/user/get`;
  return axios.post(url, {
      login: login,
      password: password,
    })
    .then(response => response.data);
}

function addUser(nom, prenom, pseudo, mail, password, date) {
  const url = `${BASE_URL}/api/user/add`;
  return axios.post(url, {
    pseudo: pseudo,
    password: password,
    nom: nom,
    prenom: prenom,
    date: date,
    mail: mail,
  })
    .then(response => response.data);
}

export { getPublicMatches, getGames, getUser, addUser };
