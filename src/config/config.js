const BASE_URL = '/api';

function getBaseUrl() {
  return BASE_URL;
}

//Function to know if the person connected is admin
function isAdmin() {
  return localStorage.getItem('is_admin') === 'true';
}

//Function to know if the person is connected
function isLogged() {
  return !(localStorage.getItem('access_token') == null);
}

export { getBaseUrl, isAdmin, isLogged };
