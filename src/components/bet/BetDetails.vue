<template>
  <div>
    <h1 class="text-center" id="labelParis">Liste de vos paris</h1>
    <div  v-for="(bet, index) in bets" :key='index'>
      <div class="mb-3 card-deck text-center">
          <div class="card mb-3 box-shadow">
            <div class="card-header">
              <h1 class="badge alert-info">{{bet.nameGame}}</h1>
              <div class="row">
                <div class="col-md-4">
                  <div>Parié le {{bet.dateBet | formatDate}}</div>
                  <div>Match le {{bet.dateMatch | formatDate}}</div>
                </div>
                <div class="col-md-4 text-center"><h2>{{bet.nameTeam}} vs {{bet.nameTeam2}}</h2></div>
                <div class="col-md-4 text-center">
                  <p class="alert alert-info" v-show="bet.win == null">Pas encore eu lieu</p>
                  <p class="alert alert-info" v-show="bet.win === true">Vous avez gagné {{bet.points}} points</p>
                  <p class="alert alert-info" v-show="bet.win === false">Vous avez perdu {{bet.points}} points</p>
                </div>
            </div>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title text-center">Vous avez parié: {{bet.scoreTeam1}} - {{bet.scoreTeam2}}</h1>
              <h1 class="text-center">Points mis en jeu: {{ bet.pointsMise }}</h1>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBet } from  "../../api/bet_api";

export default {
  name: "BetDetails",
  data() {
    return {
      bets: '',
    };
  },
  methods: {
    getBet() {
      getBet().then((result) => {
        this.bets = result.result.rows;
      });
    },
  },
  mounted() {
    this.getBet();
  },
};
</script>

<style scoped>
#labelParis {
  margin-top: 50px;
}
</style>
