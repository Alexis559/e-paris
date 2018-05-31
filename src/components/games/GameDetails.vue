<template>
  <div>
    <div v-if="this.success">
    <add-team :idGame="idGame" class="modal fade" id="createTeam" tabindex="1" role="dialog" aria-labelledby="Ajouter une équipe" aria-hidden="true"></add-team>
  <div id="showImgGame" v-bind:style="{ 'background-image': 'url(' + this.imgUrl + ')' }" style="background-attachment: fixed; color: ghostwhite; background-position: center; background-repeat: no-repeat;">
    <div v-if="success === true" class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center"><h2>{{nameGame}}</h2></div>
        <div class="col-md-4 text-center">
          <button v-show="isAdmin && logged" type="button" class="btn btn-primary" data-toggle="modal" data-target="#createTeam">
            Créer une équipe
          </button>
        </div>
      </div>
      <div id="infos">
        <p><b>Date de création:</b> {{ dateCreation | formatDate}}</p>
        <p><b>Description:</b> {{ description }}</p>
      </div>
      <div>
        <display-team :idGame="this.$route.params.idGame"></display-team>
      </div>
    </div>
  </div>
  </div>
    <not-found v-else></not-found>
  </div>
</template>
<script>

import { getGameById } from '../../api/game_api';
import NotFound from '../errors/Notfound';
import AddTeam from '../team/AddTeam';
import { isAdmin, isLogged } from '../../config/config';
import DisplayTeam from '../team/DisplayTeam';

export default {
  name: 'GameDetails',
  components: { DisplayTeam, NotFound, AddTeam },
  data() {
    return {
      nameGame: '',
      description: '',
      dateCreation: '',
      imgUrl: '',
      logged: '',
      isAdmin: '',
      idGame: '',
      success: true,
    };
  },
  methods: {
    getGameById(idGame) {
      getGameById(idGame).then((rep) => {
        this.success = rep.success;
        this.nameGame = rep.result.rows[0].nameGame;
        this.description = rep.result.rows[0].description;
        this.imgUrl = rep.result.rows[0].imgGame;
        this.idGame = rep.result.rows[0].idGame;
        this.dateCreation = rep.result.rows[0].dateCreation;
      }).catch((rep) => {
        this.success = rep.response.data.success;
      });
    },
  },
  mounted() {
    this.logged = isLogged();
    this.isAdmin = isAdmin();
    this.getGameById(this.$route.params.idGame);
  },
};
</script>

<style scoped>
  .container{
    background-color: black;
    opacity: 0.9;
  }
  button{
    margin-left: 10px;
  }
  #infos{
    margin-top: 50px;
  }
  #showImgGame{
    min-height: calc(100vh - 66px);
  }
  .row{
    padding-top: 5vh;
  }
</style>
