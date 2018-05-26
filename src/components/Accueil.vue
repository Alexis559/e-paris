<template>
  <div>
    <div class="alert alert-dark text-center" role="alert">
      <h1>Site en construction !
        {{ date }}</h1>
    </div>
  <div><img alt="lapin" src="https://i.ytimg.com/vi/AAdc-9gI5h4/maxresdefault.jpg"/></div>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  data() {
    return {
      date: '',
    };
  },
  methods: {
    getDate() {
      let date = new Date();
      this.date = date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear();
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

<style scoped>
  img{
    margin-top: -10vh;
    width: 100%;
    height: 100%;
  }
</style>
