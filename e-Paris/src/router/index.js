import Vue from 'vue';
import Router from 'vue-router';
import Schedule from '../components/Schedule';
import Accueil from '../components/Accueil';
import NotFound from '../components/Notfound';
import Games from '../components/DisplayGames';
import LogIn from '../components/connection/LogIn';
import Register from '../components/connection/Register';

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
      path: '/connection',
      name: 'Connection',
      component: LogIn,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound,
    },
  ],
});
