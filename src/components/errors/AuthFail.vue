<template>
  <div>
    <div class="cover-page">
      <h1><span class="badge badge-danger">401</span> Unauthorized</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthFail',
};
</script>

<style scoped>
  .cover-page {
    text-align: center;
    margin-top: 30vh;
  }

  .cover-page h1{
    font-size: 5em;
    color: #dc3545;
  }
</style>
