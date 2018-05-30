<template>
  <div>
    <div  v-if="logged && isAdmin" class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    <div class="modal-body text-center">
      <div id="showConnection">
        <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
        <h5 class="alert alert-success" v-show="success === true">{{ message }}</h5>
      </div>
      <form @submit.prevent="addGame" class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Ajouter un jeu</h1>
        <label for="gameName" class="sr-only">Pseudo</label>
        <input v-model="gameName" type="text" id="gameName" class="form-control" placeholder="Nom du jeu" required>
        <label for="gameDescr" class="sr-only">Password</label>
        <textarea  v-model="gameDescr" id="gameDescr" class="form-control" placeholder="Description du jeu" required></textarea>
        <label for="urlImg" class="sr-only">Lien image du jeu</label>
        <input v-model="urlImg" id="urlImg" type="url" placeholder="http://" class="form-control" required>
        <label for="inputDate" class="sr-only">Date de création</label>
        <input v-model="dateCreation" type="date" id="inputDate" class="form-control" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Ajouter</button>
      </form>
    </div>
      </div>
    </div>
    <auth-fail v-else></auth-fail>
  </div>
</template>

<script>
import { addGame } from '../../api/game_api';
import AuthFail from '../errors/AuthFail';
import { isAdmin, isLogged } from '../../auth/config';

export default {
  name: 'AddGame',
  components: { AuthFail },
  data() {
    return {
      gameName: '',
      gameDescr: '',
      dateCreation: '',
      urlImg: '',
      message: '',
      success: '',
      logged: '',
      isAdmin: '',
    };
  },
  computed: {
    validForm() {
      return this.password === this.passwordConfirm && this.password !== '';
    },
  },
  methods: {
    addGame() {
      addGame(this.gameName, this.gameDescr, this.dateCreation, this.urlImg).then((response) => {
        this.success = response.success;
        this.message = response.message;
        document.location.href = '/games';
      }).catch((error) => {
        this.success = error.response.data.success;
        this.message = error.response.data.message;
      });
    },
  },
  mounted() {
    this.isAdmin = isAdmin();
    this.logged = isLogged();
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
  .form-signin input[type="url"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: -1px;
  }
  .form-signin textarea {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
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
    height: 10vh;
  }

  .close{
    margin-right: 5px;
  }
</style>
