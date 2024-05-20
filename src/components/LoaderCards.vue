<template>
  <div class="col-content">
    <div v-for="i in 12" :key="i">
      <v-skeleton-loader type="card" class="box"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderCards"
}
</script>

<style scoped>

</style>
