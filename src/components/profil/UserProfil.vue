<template>
  <div class="container">
    <div class="row  box-shadow">
      <div class="col-md-4"></div>
      <div class="col-md-4 text-center"><h2>{{ prenom }} {{ nom }} ({{ login }})</h2> <h4>Score: {{ score }}</h4></div>
      <div class="col-md-4 text-center">
        <router-link to="/profil/update">
          <button class="btn btn-primary">Modifier profil</button>
      </router-link>
        <router-link to="/profil/update">
          <button class="btn btn-danger log">Supprimer</button>
        </router-link>
      </div>
    </div>
    <div id="infos">
      Date de création: {{ dateCreation}}
    </div>
  </div>
</template>

<script>

import { getProfilUser } from '../../api/request-api';


export default {
name: 'userProfil',
data() {
return {
  nom: '',
  prenom: '',
  dateCreation: '',
  message: '',
  login: '',
  score: '0',
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
},
mounted() {
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
