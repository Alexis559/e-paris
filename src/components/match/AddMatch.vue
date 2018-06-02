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
          <form @submit.prevent="addMatch" class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">Ajouter un Match</h1>
            <label for="idGame">Jeu</label>
            <select v-model="idGame" class="form-control" id="idGame">
              <option v-for="(game, index) in this.games" :key='index' v-bind:value="game.idGame">{{game.nameGame}}</option>
            </select>
            <div class="text-center row">
              <div class="col-md-5 mb-3">
                <select v-model="idTeam1" class="form-control" id="idTeam1">
                  <option v-for="(team, index) in this.teams" :key='index' v-bind:value="team.idTeam">{{team.nameTeam}}</option>
                </select>
              </div>
              <h2>VS</h2>
              <div class="col-md-5 mb-3">
                <select v-model="idTeam2" class="form-control" id="idTeam2">
                <option v-for="(team, index) in this.teams" :key='index' v-bind:value="team.idTeam">{{team.nameTeam}}</option>
              </select>
              </div>
            </div>
            <label for="matchDescr">Description du match</label>
            <textarea  v-model="description" id="matchDescr" class="form-control" placeholder="Description du match" required></textarea>
            <label for="dateMatch">Date du match</label>
            <input v-model="dateMatch" type="date" id="dateMatch" class="form-control" required>
            <button :disabled="!validForm" class="btn btn-lg btn-primary btn-block" type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
    <auth-fail v-else></auth-fail>
  </div>
</template>

<script>
  import { getGames } from '../../api/game_api';
  import AuthFail from '../errors/AuthFail';
  import { getTeamGame } from '../../api/team_api';
  import { addMatch} from "../../api/match_api";
  import { isAdmin, isLogged } from '../../config/config';

  export default {
    name: 'AddMatch',
    components: { AuthFail },
    data() {
      return {
        games: '',
        gameName: '',
        teams: '',
        idGame: '',
        idTeam1: '',
        idTeam2: '',
        dateMatch: '',
        description: '',
        message: '',
        success: '',
        logged: '',
        isAdmin: '',
      };
    },
    computed: {
      validForm() {
        return this.idTeam1 !== this.idTeam2 && this.idTeam1 !== '' && this.idTeam2 !== '';
      },
    },
    methods: {
      getGames() {
        getGames().then((response) => {
          this.games = response;
        });
      },
      getTeams(idGame) {
        getTeamGame(idGame).then((response) => {
          this.teams = response.rows;
          console.log(response);
        }).catch((err) => {
          this.success = err.response.data.success;
          this.message = err.response.data.message;
        });
      },
      addMatch() {
        addMatch(this.idTeam1, this.idTeam2, this.idGame, this.description, this.dateMatch).then((response) => {
          this.success = response.success;
          this.message = response.message;
          location.reload();
        }).catch((error) => {
          this.success = error.response.data.success;
          this.message = error.response.data.message;
        });
      },
    },
    //each time the idGame change we will update the select
    watch: {
      idGame: function (idGame) {
        this.getTeams(idGame);
      }
    },
    mounted() {
      this.isAdmin = isAdmin();
      this.logged = isLogged();
      this.getGames();
    },
  };
</script>

<style scoped>
  .form-signin select{
    height: 50px !important;
  }

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

  #showConnection{
    width: 100%;
    max-width: 330px;
    margin: auto;
    height: 10vh;
  }

  .form-signin label{
    margin-top: 20px;
  }

  .row{
    margin-top: 20px;
  }

  .close{
    margin-right: 5px;
  }
</style>
