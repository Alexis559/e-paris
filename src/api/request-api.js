import axios from 'axios';

// we add the token for each request if it's defined
if( localStorage.getItem("access_token") != null){
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem("access_token");
}

// const BASE_URL = '';
const BASE_URL = 'http://localhost:3000';

function getPublicMatches() {
  const url = `${BASE_URL}/api/match/get`;
  return axios.get(url).then(response => response.data);
}

function getGames() {
  console.log(localStorage.getItem('access_token'));
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

export { getPublicMatches, getGames, getLogin, addUser, getProfilUser };
