<template>
  <div>
    <div v-if="success === true" class="container">
      <div class="row  box-shadow">
        <div class="col-md-4 text-center"><h2>{{ nameGame }}</h2></div>
      </div>
      <div id="infos">
        Date de création: {{ dateCreation}}
        Description: {{ description }}
      </div>
    </div>
    <not-found v-else></not-found>
    </div>
</template>

<script>

  import { getGameByName } from '../../api/request-api';
  import NotFound from "../errors/Notfound";


  export default {
    name: 'GameDetails',
    components: {NotFound},
    data() {
      return {
        nameGame: '',
        description: '',
        dateCreation: '',
        imgUrl: '',
        success: true,
      };
    },
    methods: {
      getGameByName(nameGame) {
        getGameByName(nameGame).then((rep) => {
          this.success = rep.success;
          this.nameGame = rep.result.rows[0].nameGame;
          this.description = rep.result.rows[0].description;
          this.imgUrl = rep.result.rows[0].imgUrl;
          this.dateCreation = rep.result.rows[0].dateCreation;
        }).catch((rep) => {
          this.success = rep.response.data.success;
        });
      },
    },
    mounted() {
      this.getGameByName(this.$route.params.nameGame);
    },
  };
</script>

<style scoped>
  button{
    margin-left: 10px;
  }
  #infos{
    margin-top: 50px;
  }

  #showConnection{
    width: 100%;
    max-width: 330px;
    margin: auto;
    margin-top: 5vh;
    height: 10vh;
  }

  #showConnection h5{
    margin-top: 5vh;
  }


</style>
