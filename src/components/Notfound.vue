<template>
  <div>
    <div class="cover-page">
      <h1><span class="badge badge-danger">404</span> Page Not Found</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  };
</script>

<style scoped>

  .grand{
    min-height: 100vh;
  }

  .cover-page {
    text-align: center;
    margin-top: 30vh;
  }

  .cover-page h1{
    font-size: 5em;
    color: #dc3545;
  }
</style>
