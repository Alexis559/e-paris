<template>
  <div id="cont">
    <div v-if="logged && success">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center"><h1>Match</h1></div>
        <div class="col-md-4 text-center">
          <button v-show="isAdmin && logged" class="btn btn-primary" data-toggle="modal" data-target="#addMatch">Ajouter un match</button>
        </div>
      </div>
      <div  v-for="(game, index) in games" :key='index'>
        <div><h2 class=" alert alert-dark headerGame text-center">{{game.nameGame}}</h2></div>
        <div class="card-deck text-center">
          <div class="mb-3" v-if="match.infos.idGame === game.idGame" v-for="(match, index) in matches.match" :key='index'>
            <add-bet class="modal fade" v-bind:id="'addBet'+match.infos.idMatch" tabindex="-1" role="dialog" aria-labelledby="Parier" aria-hidden="true" :nomTeam1="match.nomTeam1" :nomTeam2="match.nomTeam2" :idMatch="match.infos.idMatch"></add-bet>
            <div class="card mb-3 box-shadow">
              <div class="card-header">
                <h1 class="badge alert-info">{{game.nameGame}}</h1>
                <h4 class="my-0 font-weight-normal text-center"> {{ match.nomTeam1 }} vs {{ match.nomTeam2 }}</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title text-center">{{ match.infos.dateMatch | formatDate }}</h1>
                <p class="text-center">{{ match.infos.description }}</p>
                <div class="text-left row">
                  <div class="col-md-6 mb-3">
                    <router-link :to="'/match/details/' + match.infos.idMatch"><button type="button" class="btn btn-lg btn-block btn-success">Details</button></router-link>
                  </div>
                  <div class="col-md-6 mb-3">
                    <button :disabled="datePassed(match.infos.dateMatch)" type="button" data-toggle="modal" v-bind:data-target="'#addBet'+match.infos.idMatch" class="btn btn-lg btn-block btn-primary">Parier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AuthFail v-else></AuthFail>
    <add-match class="modal fade" id="addMatch" tabindex="-1" role="dialog" aria-labelledby="Ajouter un match" aria-hidden="true"></add-match>
  </div>
</template>

<script>
import { getPublicMatches } from '../../api/match_api';
import { getGames } from '../../api/game_api';
import { getTeams } from '../../api/team_api';
import AuthFail from '../errors/AuthFail';
import AddMatch from './AddMatch';
import AddBet from "../bet/AddBet";
import { isLogged, isAdmin } from '../../config/config';

export default {
  name: 'DisplayMatch',
  components: { AddBet, AuthFail, AddMatch },
  data() {
    return {
      publicMatches: '',
      matches: '',
      games: '',
      teams: '',
      logged: '',
      success: 'true',
      isAdmin: '',
    };
  },
  methods: {
    getPublicMatches() {
      getPublicMatches().then((matches) => {
        this.publicMatches = matches;
        this.prepareMatch();
      }).catch((rep) => {
        this.success = rep.response.data.success;
      });
    },
    getTeams() {
      getTeams().then((teams) => {
        this.teams = teams.rows;
      });
    },
    getGames() {
      getGames().then((games) => {
        this.games = games;
      });
    },
    datePassed(date) {
      if (new Date(date) < new Date()){
        return true;
      }else{
        return false;
      }
    },
    prepareMatch() {
      this.matches = {match: []};
      for(let i=0; i<this.publicMatches.length; i++) {
        this.matches.match[i] = {infos: this.publicMatches[i]};
        for(let j=0; j<this.teams.length; j++) {
          if(this.publicMatches[i].idTeam1 === this.teams[j].idTeam){
            this.matches.match[i].nomTeam1 = this.teams[j].nameTeam;
            this.matches.match[i].logoTeam1 = this.teams[j].logoTeam;
          }
          if(this.publicMatches[i].idTeam2 === this.teams[j].idTeam){
            this.matches.match[i].nomTeam2 = this.teams[j].nameTeam;
            this.matches.match[i].logoTeam2 = this.teams[j].logoTeam;
          }
        }
      }
    },
  },
  mounted() {
    this.logged = isLogged();
    this.isAdmin = isAdmin();
    this.getGames();
    this.getTeams();
    this.getPublicMatches();
  },
};
</script>

<style scoped>
  #cont{
    max-width: 90vw;
    margin: auto;
  }

  .headerGame{
    margin-top: 50px;
  }

  .row{
    margin: auto;
    margin-top: 30px;
    max-width: 90vw;
  }
</style>
