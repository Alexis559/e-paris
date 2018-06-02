import axios from 'axios';
import { getBaseUrl } from '../config/config';

// we add the token for each request if it's defined
if (localStorage.getItem('access_token') != null) {
  axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access_token');
}

const BASE_URL = getBaseUrl();

function getLogin(login, password) {
  const url = `${BASE_URL}/user/login`;
  return axios.post(url, {
    login: login,
    password: password,
  })
    .then(response => response.data);
}

function updateUser(nom, prenom, pseudo, mail) {
  const url = `${BASE_URL}/user/update`;
  return axios.put(url, {
    pseudo: pseudo,
    nom: nom,
    prenom: prenom,
    mail: mail,
  })
    .then(response => response.data);
}

function getProfilUser() {
  const url = `${BASE_URL}/user/profil`;
  return axios.get(url)
    .then(response => response.data);
}

function addUser(nom, prenom, pseudo, mail, password, date) {
  const url = `${BASE_URL}/user/add`;
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
  const url = `${BASE_URL}/user/delete`;
  return axios.delete(url)
    .then(response => response.data);
}

function getClassement() {
  const url = `${BASE_URL}/user/classement`;
  return axios.get(url)
    .then(response => response.data);
}

export { getLogin, addUser, getProfilUser, updateUser, deleteUser, getClassement };
