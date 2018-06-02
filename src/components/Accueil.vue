<template>
  <div id="acc"></div>
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
  #acc{
    width: 100vw;
    height: calc(100vh - 66px);
    background-image: url('https://i2.wp.com/www.connectesport.com/alpha/wp-content/uploads/2016/04/maxresdefault-2.jpg?fit=1920%2C1080&ssl=1');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
