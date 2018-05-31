<template>
  <div>
    <div v-if="logged && success">
      <div class="row  box-shadow">
        <div class=" alert alert-primary col-md-4">
          <h1 class="text-center">{{this.matches[0].nameGame}}</h1><h1 class="text-center">{{this.matches[0].description}}</h1></div>
        <div class="col-md-4 text-center"><h1><img class="rounded-circle" v-bind:src="this.matches[0].logoTeam" alt="team1"/>  {{this.matches[0].nameTeam}} vs {{this.matches[1].nameTeam}} <img class="rounded-circle" v-bind:src="this.matches[1].logoTeam" alt="team1"/> </h1>
        </div>
        <div v-show="this.datePassed(this.matches[0].dateMatch)" class="col-md-4 text-center">
          <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#updateResultat">
            Résultats
          </button>
        </div>
      </div>
      <div class="text-center" id="infos">
        <h1>{{ this.matches[0].dateMatch | formatDate}} {{ this.matches[0].dateMatch | getTimeFromNow}}</h1>
      </div>
      <div v-show="this.matches[0].scoreTeam1 !== -1" class="score row  box-shadow">
        <div class="col-md-4"></div>
        <div class="alert alert-success col-md-4 text-center"><h1>{{this.matches[0].scoreTeam1}} - {{this.matches[0].scoreTeam2}}</h1></div>
      </div>

      <!-- popup -->
      <div class="modal fade" id="updateResultat" tabindex="-1" role="dialog" aria-labelledby="Résultat" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body text-center">
            <form @submit.prevent="updateResultat" class="form-signin">
              <h1 class="h3 mb-3 font-weight-normal">Résultat</h1>
              <label for="team1" class="sr-only">{{this.matches[0].nameTeam}}</label>
              <input v-model="scoreTeam1" type="number" id="team1" class="form-control" required>
              <label for="team2" class="sr-only">{{this.matches[1].nameTeam}}</label>
              <input v-model="scoreTeam2" type="number" id="team2" class="form-control" required>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Publier</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
    <AuthFail v-else></AuthFail>


  </div>
</template>

  <script>
  import moment from 'moment';
  import { getMatchById, updateResultat } from '../../api/match_api';
  import AuthFail from '../errors/AuthFail';
  import { isLogged, isAdmin } from '../../config/config';

  export default {
    name: 'MatchDetails',
    components: { AuthFail },
    data() {
      return {
        matches: '',
        scoreTeam1: '',
        scoreTeam2: '',
        logged: '',
        success: true,
        isAdmin: '',
      };
    },
    methods: {
      updateResultat() {
        updateResultat(this.matches[0].idMatch, this.scoreTeam1, this.scoreTeam2).then((res) => {
          this.success = res.success;
          this.message = res.message;
        }).catch((rep)=> {
          this.success = rep.response.data.success;
          this.message = rep.response.data.message;
        })
      },
      getMatchById(idMatch) {
        getMatchById(idMatch).then((matches) => {
          this.matches = matches.rows;
        }).catch((rep) => {
          this.success = rep.response.data.success;
        });
      },
      datePassed(date) {
        if (date > moment().format("YY-MM-DD")){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted() {
      this.getMatchById(this.$route.params.idMatch);
      this.logged = isLogged();
      this.isAdmin = isAdmin();
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row{
    margin-top: 30px;
  }

  img{
    height: 100px;
    width: 100px;
  }

  .score{
    margin-top: 60px;
  }

  .score h1{
    font-size: 90px;
  }
</style>
