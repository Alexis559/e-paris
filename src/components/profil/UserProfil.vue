<template>
  <div>
    <div v-if="logged && success" class="container">
      <div id="showConnection">
        <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
      </div>
      <div class="row  box-shadow">
        <div class="col-md-4 text-center"> <h2 v-show="admin">Admin</h2></div>
        <div class="col-md-4 text-center"><h2>{{ prenom }} {{ nom }} ({{ login }})</h2>
          <h4 v-show="score <= 0" class="alert alert-warning">Score: {{ score }}</h4>
          <h4 v-show="score > 0" class="alert alert-warning">Score: {{ score }}</h4>
        </div>
        <div class="col-md-4 text-center">
          <router-link to="/profil/update">
            <button class="btn btn-primary">Modifier profil</button>
          </router-link>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#userSuppr">
            Supprimer
          </button>
        </div>
      </div>
      <div id="infos">
        Membre depuis le: {{ dateCreation | formatDate}}
      </div>
      <bet-details></bet-details>
    </div>
    <auth-fail v-else></auth-fail>

    <!-- modal -->
    <div class="modal fade" id="userSuppr" tabindex="-1" role="dialog" aria-labelledby="Supprimer compte" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userSupprLabel">Supprimer compte</h5>
          </div>
          <div class="modal-body">
            Etes-vous sur de vouloir supprimer votre compte ?
          </div>
          <div class="modal-footer">
            <button @click="deleteUser" type="button" class="btn btn-secondary">Oui</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { getProfilUser, deleteUser } from '../../api/user_api';
import AuthFail from '../errors/AuthFail';
import { isLogged } from '../../config/config';
import BetDetails from "../bet/BetDetails";

export default {
  name: 'userProfil',
  components: {BetDetails, AuthFail },
  data() {
    return {
      nom: '',
      prenom: '',
      admin: '',
      dateCreation: '',
      login: '',
      score: '',
      logged: '',
      message: '',
      success: true,
    };
  },
  methods: {
    getProfilUser() {
      getProfilUser().then((rep) => {
        this.success = rep.success;
        this.nom = rep.result.rows[0].nomUser;
        this.prenom = rep.result.rows[0].prenomUser;
        this.login = rep.result.rows[0].loginUser;
        this.admin = rep.result.rows[0].admin;
        this.score = rep.result.rows[0].score;
        this.dateCreation = rep.result.rows[0].dateCreation;
      }).catch((rep) => {
        this.message = rep.response.data.message;
        this.success = rep.response.data.success;
      });
    },
    deleteUser() {
      deleteUser().then((rep) => {
        this.message = rep.message;
        this.success = rep.success;
        this.$store.dispatch('logout');
        document.location.href = '/';
      }).catch((rep) => {
        this.message = rep.response.data.message;
        this.success = rep.response.data.success;
      });
    }
  },
  mounted() {
    this.logged = isLogged();
    this.getProfilUser();
  },
};
</script>

<style scoped>
  button{
    margin-left: 10px;
  }
  #infos{
    margin-top: 50px;
  }

  #showConnection{
    width: 100%;
    max-width: 330px;
    margin: auto;
    margin-top: 5vh;
    height: 10vh;
  }

  #showConnection h5{
    margin-top: 5vh;
  }


</style>
