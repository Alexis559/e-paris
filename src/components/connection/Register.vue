<template>
  <div>
  <div v-if="!logged" class="text-center">
    <div id="showConnection">
      <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
      <h5 class="alert alert-success" v-show="success === true">{{ message }}</h5>
    </div>
    <form @submit.prevent="addUser" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
      <div class="text-left row">
        <div class="col-md-6 mb-3">
          <label for="prenomUser" class="sr-only">Prénom</label>
          <input v-model="prenomUser" type="text" class="form-control" id="prenomUser" placeholder="Prénom" value="" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="nomUser" class="sr-only">Nom</label>
          <input v-model="nomUser" type="text" class="form-control" id="nomUser" placeholder="Nom" value="" required>
        </div>
      </div>
      <label for="inputPseudo" class="sr-only">Pseudo</label>
      <input v-model="pseudoUser" type="text" id="inputPseudo" class="form-control" placeholder="Pseudo" required>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="mailUser" type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <label for="inputPassword" class="sr-only">Password (confirm)</label>
      <input v-model="passwordConfirm" type="password" id="inputPasswordSecond" class="form-control" placeholder="Password Confirm" required>
      <p class="badge badge-danger" v-if="!validForm">Les mots de passe ne correspondent pas !</p>
      <label for="inputDate" class="sr-only">Date de naissance</label>
      <input v-model="dateNaissance" type="date" id="inputDate" class="form-control" placeholder="" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="!validForm">Sign up</button>
    </form>
  </div>
    <AlreadyConnect v-else></AlreadyConnect>
  </div>
</template>

<script>
import { addUser } from '../../api/request-api';
import AlreadyConnect from "../errors/AlreadyConnect";

export default {
  name: 'Register',
  components: {AlreadyConnect},
  data(){
    return {
      nomUser: '',
      prenomUser: '',
      pseudoUser: '',
      mailUser: '',
      password: '',
      passwordConfirm: '',
      dateNaissance: '',
      message: '',
      success: '',
      logged: '',
    };
  },
  computed: {
    validForm() {
      return this.password === this.passwordConfirm && this.password !== '';
    },
  },
  methods: {
    addUser() {
      addUser(this.nomUser, this.prenomUser, this.pseudoUser, this.mailUser, this.password, this.dateNaissance).then((response) => {
        this.success = response.success;
       this.message = response.message;
       sleep(2000);
       document.location.href = '/login';
      }).catch((error) => {
        this.success = error.response.data.success;
        this.message = error.response.data.message;
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
    max-width: 500px;
    padding: 15px;
    margin: auto;
    margin-top: -10vh;
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
    border-radius: 0;
  }
  .form-signin input[type="password"] {
    border-radius: 0;
    margin-bottom: -1px;
  }

  .form-signin input[type="date"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-signin input[type="text"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: -1px;
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
