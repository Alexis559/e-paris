<template>
  <div>
    <h2 class="text-center">Equipes</h2>
    <div class="card-deck text-center">
      <div class="container col-sm-4" v-for="(team, index) in teams" :key='index'>
        <div  v-bind:style="{ 'background-image': 'url(' + team.logoTeam + ')'}" style="background-repeat: no-repeat; background-position: center;" class="card mb-4 box-shadow">
          <div class="card-body">
            <h4 class="my-0 font-weight-normal text-center"> {{ team.nameTeam }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeamGame } from '../../api/game_api';


export default {
  name: 'DisplayTeam',
  props: ['idGame'],
  data() {
    return {
      teams: '',
      message: '',
      success: '',
    };
  },
  methods: {
    getTeams(idGame) {
      getTeamGame(idGame).then((response) => {
        this.teams = response.rows;
      });
    },
  },
  mounted() {
    this.getTeams(this.idGame);
  },
};
</script>

<style scoped>
  h4{
    color: black;
  }
  h2{
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .card-body{
    height: 300px;
  }
</style>
