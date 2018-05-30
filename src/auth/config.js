const BASE_URL = '/api';

function getBaseUrl() {
  return BASE_URL;
}

function isAdmin() {
  return localStorage.getItem('is_admin') === 'true';
}

function isLogged() {
  return !(localStorage.getItem('access_token') == null);
}

export { getBaseUrl, isAdmin, isLogged };
