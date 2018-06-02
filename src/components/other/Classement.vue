<template>
  <div class="container">
    <h1 class="text-center">Classement</h1>
    <div class="alert alert-light row">
      <div class="col-md-4 text-center"><h1>N°</h1></div>
      <div class="col-md-4 text-center"><h1>Pseudo</h1></div>
      <div class="col-md-4 text-center"><h1>Score</h1></div>
    </div>
  <div  v-for="(user, index) in classement" :key='index'>
        <div class="alert alert-warning row">
      <div class="col-md-4 text-center"><h1>{{index+1}}</h1></div>
      <div class="col-md-4 text-center"><h1>{{user.loginUser}}</h1></div>
      <div class="col-md-4 text-center"><h1>{{user.score}}</h1></div>
    </div>
  </div>
  </div>
</template>

<script>
import { getClassement} from "../../api/user_api";

export default {
  name: "Classement",
  data() {
    return {
      classement: '',
    };
  },
  methods: {
    getClassement() {
      getClassement().then((result) => {
        this.classement = result.result.rows;
      });
    },
  },
  mounted() {
    this.getClassement();
  },
};
</script>

<style scoped>
.row{
  margin-top: 50px;
}
</style>
