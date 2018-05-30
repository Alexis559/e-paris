import axios from 'axios';

// we add the token for each request if it's defined
if( localStorage.getItem('access_token') != null){
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = '';
//const BASE_URL = 'http://localhost:3000';

function getPublicMatches() {
  const url = `${BASE_URL}/api/match/get`;
  return axios.get(url).then(response => response.data);
}

function getGames() {
  const url = `${BASE_URL}/api/game/get`;
  return axios.get(url).then(response => response.data);
}

function getLogin(login, password) {
  const url = `${BASE_URL}/api/user/login`;
  return axios.post(url, {
    login: login,
    password: password,
  })
  .then(response => response.data);
}

function updateUser(nom, prenom, pseudo, mail) {
  const url = `${BASE_URL}/api/user/update`;
  return axios.put(url, {
    pseudo: pseudo,
    nom: nom,
    prenom: prenom,
    mail: mail,
  })
    .then(response => response.data);
}

function getProfilUser() {
  const url = `${BASE_URL}/api/user/profil`;
  return axios.get(url)
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

function deleteUser() {
  const url = `${BASE_URL}/api/user/delete`;
  return axios.delete(url)
    .then(response => response.data);
}

function addGame(nameGame, descrGame, dateCreation, imgGame) {
  const url = `${BASE_URL}/api/game/add`;
  return axios.post(url, {
    nameGame: nameGame,
    descrGame: descrGame,
    dateCreation: dateCreation,
    imgGame: imgGame,
  })
    .then(response => response.data);
}

function createTeam(nameTeam, dateCreation, imgUrl, idGame) {
  const url = `${BASE_URL}/api/team/add`;
  return axios.post(url, {
    nameTeam: nameTeam,
    dateCreation: dateCreation,
    dateCreation: dateCreation,
    imgUrl: imgUrl,
    idGame: idGame,
  })
    .then(response => response.data);
}

function getGameByName(nameGame) {
  const url = `${BASE_URL}/api/game/get/` + nameGame;
  return axios.get(url).then(response => response.data);
}

export { getPublicMatches, getGames, getLogin, addUser, getProfilUser, updateUser, deleteUser, addGame, getGameByName, createTeam};
