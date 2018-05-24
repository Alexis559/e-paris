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
        <router-link to="/connection"><button class="btn btn-info log">Log in</button></router-link>
        <router-link to="/register"><button class="btn btn-success log">Sign up</button></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'app-nav',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}
.log { margin: 5px 10px 0 0; }
</style>
