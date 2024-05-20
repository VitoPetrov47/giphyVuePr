<template>
  <v-container class="container" style="padding-top: 150px">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4" v-if="author">
          <h1 class="display-2 mb-4">Author Details</h1>
          <div class="text-center">
            <v-img class="gp-img" :src="author.avatar_url" :alt="author.username"></v-img>
            <p class="my-4">Author Name: {{ author.username }}</p>
            <v-btn :href="author.profile_url" target="_blank" color="primary">Author Profile Url</v-btn>
          </div>
        </v-card>
        <Loader v-else/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'AuthorPage',
  setup() {
    const route = useRoute();
    const author = ref<any>(null);

    onMounted(() => {
      const authData = route.query.item ? JSON.parse(<string>route.query.item) : null;
      author.value = authData;
      console.log('Author ID:', route.params.id);
      console.log('Author Details:', author.value);
    });

    return {
      author
    };
  }
});
</script>

<style scoped>
.gif-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.gp-img {
  width: 600px;
}
.gp-text {
  color: white;
  font-size: 16px;
  text-align: center;
}
.gp-link {
  text-align: center;
  color: white;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;

  transition: all .3s;
}
.gp-link:hover {
  color: #34e3ff;
}
</style>
