<template>
  <div class="text-center">
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
      <label for="inputDate" class="sr-only">Date de naissance</label>
      <input v-model="dateNaissance"type="date" id="inputDate" class="form-control" placeholder="" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
  import { addUser } from '../../api/request-api';

  export default {
    name: "Register",
    data(){
      return {
        nomUser: '',
        prenomUser:'',
        pseudoUser: '',
        mailUser: '',
        password: '',
        passwordConfirm: '',
        dateNaissance: '',
      }
    },
      methods: {
        addUser() {
          addUser(this.nomUser, this.prenomUser, this.pseudoUser, this.mailUser, this.password, this.dateNaissance);
        }
      }
  };
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 500px;
    padding: 15px;
    margin: auto;
    margin-top: 15vh;
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
</style>
