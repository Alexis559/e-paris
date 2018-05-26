<template>
  <div>
    <h3 class="text-center">Games</h3>
    <hr/>
    <div class="col-sm-3" v-for="game in games">
      <div><h1>{{ game.nameGame }}</h1></div>
      <div class="panel panel-default">
        <div class="panel-body">
          <p><span class="badge alert-info"> Date: </span> {{ game.dateCreation }} </p>
          <p><span class="badge alert-danger"> Descr: </span>
            <strong> {{ game.description }} </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getGames } from '../api/request-api';

export default {
  name: 'DisplayGames',
  data() {
    return {
      games: '',
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
    this.getGames();
  },
};
</script>

<style scoped>

</style>
