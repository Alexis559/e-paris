import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import moment from 'moment';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('access_token'),
  },
  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({state, commit, rootState}, creds) {
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('access_token', creds);
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },
    logout({
      commit,
    }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('is_admin');
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
  },
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.filter('getTimeFromNow', function(value) {
  if (value) {
    return moment(String(value), "YYYY-MM-DD").fromNow();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
