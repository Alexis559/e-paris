<template>
  <div>
    <app-nav></app-nav>
    <router-view/>
  </div>
</template>

<script>
import AppNav from './components/AppNav';

export default {
  name: 'App',
  components: { AppNav },
};
</script>
