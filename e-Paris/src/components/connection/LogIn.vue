<template>
  <div class="text-center">
    <div id="showConnection">
      <h5 class="alert alert-danger" v-show="message === 'UTILISATEUR INCONNU'">{{ message }}</h5>
      <h5 class="alert alert-success" v-show="user.length != 0">{{ message }}</h5>
    </div>
    <form @submit.prevent="connectUser" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please Log in</h1>
      <label for="inputLogin" class="sr-only">Login</label>
      <input v-model="login" type="text" id="inputLogin" class="form-control" placeholder="Login" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
    </form>
    <router-link to="/register"><p>Create an account</p></router-link>
    <p>{{ user.loginUser }} </p>
    <p> {{ user.prenomUser }}
      {{ user.nomUser }}</p>
    <p>{{ user.mailUser }}</p>
  </div>
</template>

<script>
  import { getUser } from '../../api/request-api';

  export default {
    name: 'LogIn',
    data() {
      return {
        login: '',
        password: '',
        user: '',
        message: '',
      }
    },
    methods: {
      connectUser() {
        getUser(this.login, this.password).then((user) => {
          if(user.length == 0){
            this.message = 'UTILISATEUR INCONNU';
            this.user = '';
          }else{
            this.message = 'Connecté !';
            this.user = user[0];
          }
        });
      },
    },
  };
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  #showConnection{
    width: 100%;
    max-width: 330px;
    margin: auto;
    margin-top: 10vh;
    height: 10vh;
  }

  #showConnection h5{
    margin-top: 5vh;
  }
</style>
