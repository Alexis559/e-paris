import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
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
      console.log('login...', creds);
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('access_token', creds);
          commit(LOGIN_SUCCESS);
          console.log(localStorage.getItem('access_token'));
          resolve();
        }, 1000);
      });
    },
    logout({
      commit,
    }) {
      localStorage.removeItem('access_token');
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
  },
});


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
