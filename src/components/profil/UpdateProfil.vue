<template>
    <div class="text-center">
      {{ message }}
      <form @submit.prevent="updateUser" class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Modifier votre profil</h1>
        <div class="text-left row">
          <div class="col-md-6 mb-3">
            <label for="prenomUser" class="sr-only">Prénom</label>
            <input v-model="prenomUser" type="text" class="form-control" id="prenomUser" placeholder="Prénom" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="nomUser" class="sr-only">Nom</label>
            <input v-model="nomUser" type="text" class="form-control" id="nomUser" placeholder="Nom" value="" required>
          </div>
        </div>
        <label for="inputPseudo" class="sr-only">Pseudo</label>
        <input v-model="pseudoUser" type="text" id="inputPseudo" class="form-control" placeholder="Pseudo" required>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="mailUser" type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Modifier</button>
      </form>
    </div>
</template>


<script>
  import { updateUser, getProfilUser } from '../../api/request-api';

  export default {
    name: 'UpdateProfil',
    data(){
      return {
        nomUser: '',
        prenomUser: '',
        pseudoUser: '',
        mailUser: '',
        message: '',
      };
    },
    methods: {
      updateUser() {
        updateUser(this.nomUser, this.prenomUser, this.pseudoUser, this.mailUser).then((rep) =>  {
          if(rep.message === 'Utilisateur modifié !'){
            this.$store.dispatch('logout');
            this.$store.dispatch('login', rep.token).then(() => {
              document.location.href = '/profil';
            });
          }
        });
       },
      getProfilUser() {
        getProfilUser().then((rep) => {
          this.nomUser = rep.result.rows[0].nomUser;
          this.prenomUser = rep.result.rows[0].prenomUser;
          this.pseudoUser = rep.result.rows[0].loginUser;
          this.mailUser = rep.result.rows[0].mailUser;
        });
      },
    },
    mounted() {
      if(!this.store.getters.isLoggedIn()){
        router.push('/');
      }
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
    margin-top: 15vh;
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
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-radius: 0;
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

</style>

