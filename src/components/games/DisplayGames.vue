<template>
  <div class="container">
    <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 text-center"><h2>Jeux</h2></div>
    <div class="col-md-4 text-center">
        <button v-show="isAdmin && logged" class="btn btn-primary" data-toggle="modal" data-target="#addGame">Ajouter un jeu</button>
    </div>
    </div>
    <div class="card-deck text-center">
      <div class="col-md-6" v-for="(game, index) in games" :key='index'>
        <router-link :to="'/games/' + game.idGame">
        <div class="col-mb-3">
        <div  v-bind:style="{ 'background-image': 'url(' + game.imgGame + ')' }" style="color: ghostwhite; opacity: 0.85; background-position: center; background-repeat: no-repeat;">
          <div>
            <div><h1 class="text-center" style="color: white;">{{ game.nameGame }}</h1></div>
          </div>
        </div>
      </div>
      </router-link>
      </div>
    </div>
    <add-game class="modal fade" id="addGame" tabindex="-1" role="dialog" aria-labelledby="Ajouter un jeu" aria-hidden="true"></add-game>
  </div>
</template>

<script>

import { getGames } from '../../api/game_api';
import AddGame from './AddGame';
import { isAdmin, isLogged } from '../../config/config';

export default {
  name: 'DisplayGames',
  components: { AddGame },
  data() {
    return {
      games: '',
      logged: '',
      isAdmin: '',
    };
  },
  methods: {
    getGames() {
      getGames().then((games) => {
        this.games = games;
      });
    },
  },
  mounted() {
    this.logged = isLogged();
    this.isAdmin = isAdmin();
    this.getGames();
  },
};
</script>

<style scoped>
  .container{
    max-width: 99vw;
  }

  .row{
    margin-top: 5vh;
  }

  h2{
    margin-bottom: 5vh;
  }

  h3{
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  h1{
    line-height: 50vh;
    height: auto;
  }
</style>
