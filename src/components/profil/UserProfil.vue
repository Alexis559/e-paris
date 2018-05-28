<template>
  <div>
    <div v-if="logged" class="container">
      <div class="row  box-shadow">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center"><h2>{{ prenom }} {{ nom }} ({{ login }})</h2> <h4>Score: {{ score }}</h4></div>
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
        Date de création: {{ dateCreation}}
      </div>
    </div>
    <auth-fail v-else></auth-fail>
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

  import { getProfilUser, deleteUser} from '../../api/request-api';
  import AuthFail from "../errors/AuthFail";


  export default {
    name: 'userProfil',
    components: {AuthFail},
    data() {
      return {
        nom: '',
        prenom: '',
        dateCreation: '',
        login: '',
        score: '0',
        logged: '',
      };
    },
    methods: {
      getProfilUser() {
        getProfilUser().then((rep) => {
          this.nom = rep.result.rows[0].nomUser;
          this.prenom = rep.result.rows[0].prenomUser;
          this.login = rep.result.rows[0].loginUser;
          this.dateCreation = rep.result.rows[0].dateCreation;

        });
      },
      deleteUser() {
        deleteUser().then((rep) => {
          this.$store.dispatch('logout');
          document.location.href = '/';
        });
      }
    },
    mounted() {
      this.logged = this.$store.getters.isLoggedIn;
      this.getProfilUser();
    },
  };
</script>

<style scoped>
  .container {
    margin-top: 15vh;
  }
  button{
    margin-left: 10px;
  }
  #infos{
    margin-top: 50px;
  }
</style>
