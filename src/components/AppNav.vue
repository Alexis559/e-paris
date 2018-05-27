<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-brand">
      <router-link to="/" class="navbar-brand"> e-Paris </router-link>
    </div>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li>
          <router-link to="/" class="navbar-brand nav-link">Accueil</router-link>
        </li>
        <li>
          <router-link to="/programme" class="navbar-brand nav-link">Programme</router-link>
        </li>
        <li>
          <router-link to="/games" class="navbar-brand nav-link">Jeux</router-link>
        </li>
      </ul>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <router-link to="/login" v-if="!isLoggedIn"><button class="btn btn-info log">Log in</button></router-link>
        <router-link to="/register" v-if="!isLoggedIn"><button class="btn btn-success log">Sign up</button></router-link>
        <router-link to="/profil" v-if="isLoggedIn"> <button type="button" class="btn btn-info log"><img src="../assets/icons/open-iconic-master/svg/person.svg" alt="person"/>User</button></router-link>
        <router-link to="" v-if="isLoggedIn"><button @click="logout" class="btn btn-danger log">Log out</button></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'app-nav',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      document.location.href = '/';
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}
.log { margin: 5px 10px 0 0; }
  img{
    height: 15px;
    margin: auto;
  }
</style>
glyphicon glyphicon-user
