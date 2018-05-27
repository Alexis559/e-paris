import Vue from 'vue';
import Router from 'vue-router';
import Schedule from '../components/Schedule';
import Accueil from '../components/Accueil';
import NotFound from '../components/errors/Notfound';
import Games from '../components/DisplayGames';
import LogIn from '../components/connection/LogIn';
import Register from '../components/connection/Register';
import UserProfil from '../components/profil/UserProfil';
import UserProfilUpdate from '../components/profil/UpdateProfil';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
    },
    {
      path: '/programme',
      name: 'Schedule',
      component: Schedule,
    },
    {
      path: '/games',
      name: 'Games',
      component: Games,
    },
    {
      path: '/login',
      name: 'Login',
      component: LogIn,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/profil/update',
      name: 'User Profil Update',
      component: UserProfilUpdate,
    },
    {
      path: '/profil',
      name: 'User Profil',
      component: UserProfil,
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound,
    },
  ],
});
