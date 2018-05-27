<template>
  <div>
    <div v-if="!logged" class="text-center">
      <div id="showConnection">
        <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
        <h5 class="alert alert-success" v-show="success === true">{{ message }}</h5>
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
    </div>
    <AlreadyConnect v-else></AlreadyConnect>
  </div>
</template>

<script>
import { getLogin } from '../../api/request-api';
import AlreadyConnect from "../errors/AlreadyConnect";

export default {
  name: 'LogIn',
  components: {AlreadyConnect},
  data() {
    return {
      login: '',
      password: '',
      user: '',
      message: '',
      success: '',
      logged: '',
    };
  },
  methods: {
    connectUser() {
      getLogin(this.login, this.password).then((user) => {
        if (user.success) {
          this.success = true;
          this.message = 'Connecté !';
          this.$store.dispatch('login', user.token).then(() => {
            document.location.href = '/';
          });
        } else {
          this.message = 'UTILISATEUR INCONNU';
          this.success = false;
        }
      });
    },
  },
  mounted() {
    this.logged = this.$store.getters.isLoggedIn;
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
