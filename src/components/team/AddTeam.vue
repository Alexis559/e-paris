<template>
  <div>
    <div  v-if="logged && isAdmin" class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close text-right" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body text-center">
          <div id="showConnection">
            <h5 class="alert alert-danger" v-show="success === false">{{ message }}</h5>
            <h5 class="alert alert-success" v-show="success === true">{{ message }}</h5>
          </div>
          <form @submit.prevent="createTeam" class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">Créer une équipe</h1>
            <label for="nameTeam" class="sr-only">Nom de l'équipe</label>
            <input v-model="nameTeam" type="text" id="nameTeam" class="form-control" placeholder="Nom de l'équipe" required>
            <label for="urlImg" class="sr-only">Lien logo de l'équipe</label>
            <input v-model="urlImg" id="urlImg" type="url" placeholder="http://" class="form-control" required>
            <label for="dateCreation" class="sr-only">Date de création</label>
            <input  v-model="dateCreation" type="date" id="dateCreation" class="form-control" placeholder="" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
    <auth-fail v-else></auth-fail>
  </div>
</template>

<script>
import { createTeam } from '../../api/team_api';
import AuthFail from '../errors/AuthFail';
import { isAdmin, isLogged } from '../../config/config';

export default {
  name: 'AddTeam',
  components: { AuthFail },
  props: ['idGame'],
  data() {
    return {
      nameTeam: '',
      dateCreation: '',
      urlImg: '',
      message: '',
      success: '',
      logged: '',
      isAdmin: '',
    };
  },
  methods: {
    createTeam() {
      createTeam(this.nameTeam, this.dateCreation, this.urlImg, this.idGame).then((response) => {
        this.success = response.success;
        this.message = response.message;
        location.reload();
      }).catch((rep) => {
        this.message = rep.response.data.message;
        this.success = rep.response.data.success;
      });
    },
  },
  mounted() {
    this.isAdmin = isAdmin();
    this.logged = isLogged();
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
