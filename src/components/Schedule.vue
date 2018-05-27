<template>
  <div>
    <div v-if="logged">
      <h3 class="text-center">Schedule Matches</h3>
      <hr/>
      <div><h1 class="badge alert-info">League Of Legends</h1></div>
      <div class="card-deck text-center">
        <div class="col-sm-3" v-for="(data, index) in publicMatches" :key='index'>
          <div class="card mb-3 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal text-center"> {{ data.name }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title text-center">{{ data.date }}</h1>
              <p class="text-center">{{ data.descr }}</p>
              <button type="button" class="btn btn-lg btn-block btn-primary">Parier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AuthFail v-else></AuthFail>
  </div>
</template>

<script>
import { getPublicMatches } from '../api/request-api';
import AuthFail from "./errors/AuthFail";

export default {
  name: 'publicMatches',
  components: {AuthFail},
  data() {
    return {
      publicMatches: '',
      logged: '',
    };
  },
  methods: {
    getPublicMatches() {
      getPublicMatches().then((matches) => {
        this.publicMatches = matches;
      });
    },
  },
  mounted() {
    this.logged = this.$store.getters.isLoggedIn;
    this.getPublicMatches();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
