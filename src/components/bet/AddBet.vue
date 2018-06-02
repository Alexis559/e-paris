<template>
  <div>
    <div  v-if="logged" class="modal-dialog" role="document">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body text-center">
            <div id="showConnection">
              <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
              <h5 class="alert alert-success" v-show="success === true">{{ message }}</h5>
            </div>
            <form @submit.prevent="createBet" class="form-signin">
              <h1 class="h3 mb-3 font-weight-normal">Paris</h1>
              <label for="team1">{{ nomTeam1}}</label>
              <input v-model="scoreTeam1" type="number" id="team1" class="form-control" required>
              <label for="team2" >{{ nomTeam2}}</label>
              <input v-model="scoreTeam2" type="number" id="team2" class="form-control" required>
              <label for="mise">Mise (pts)</label>
              <input v-model="misePoints" type="number" id="mise" class="form-control" required>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Parier !</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    <auth-fail v-else></auth-fail>
  </div>
</template>

<script>
import { createBet } from "../../api/bet_api";
import { getProfilUser } from "../../api/user_api";
import { isLogged } from "../../config/config";
import AuthFail from "../errors/AuthFail";

export default {
  name: "AddBet",
  components: { AuthFail },
  props: ['nomTeam1', 'nomTeam2', 'idMatch'],
  data() {
    return {
      logged: '',
      success: '',
      message: '',
      scoreTeam1: '',
      scoreTeam2: '',
      misePoints: '',
      user: '',
    };
  },
  methods: {
    createBet() {
      createBet(this.idMatch, this.scoreTeam1, this.scoreTeam2, this.misePoints).then((resp) => {
        this.success = resp.success;
        this.message = resp.message;
        location.reload();
      }).catch((err) => {
        this.success = err.response.data.success;
        this.message = err.response.data.message;
      });
    },
    getProfilUser() {
      getProfilUser().then((resp) => {
        this.user = resp.rows;
      });
    },
  },
  mounted() {
    this.logged = isLogged();
    this.getProfilUser();
  },
};
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 500px;
    padding: 15px;
    margin: auto;
    margin-top: -10vh;
  }
  .form-signin {
    font-weight: 400;
  }

  .form-signin button, label {
    margin-top: 30px;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="url"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: -1px;
  }
  .form-signin textarea {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: -1px;
  }

  .form-signin input[type="date"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-signin input[type="text"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: -1px;
  }


  #showConnection{
    width: 100%;
    max-width: 330px;
    margin: auto;
    height: 10vh;
  }

  .close{
    margin-right: 5px;
  }
</style>
