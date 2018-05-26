<template>
  <div>
    <h3 class="text-center">Schedule Matches</h3>
    <hr/>
    <div><h1 class="badge alert-info">League Of Legends</h1></div>
    <h1 class="alert alert-danger text-center" v-if="publicMatches === ''">AUTH FAILED</h1>
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
</template>

<script>
import { getPublicMatches } from '../api/request-api';

export default {
  name: 'publicMatches',
  data() {
    return {
      publicMatches: '',
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
    this.getPublicMatches();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
