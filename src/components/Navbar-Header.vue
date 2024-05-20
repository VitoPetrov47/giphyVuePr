<template>
  <v-app-bar color="primary" height="100%">
    <v-container class="container">
      <v-row align="center" justify="space-between">
        <v-col cols="1">
          <router-link to="/">
            <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 35" class="IconContainer-sc-zg5bol iUMGpL"><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#00ff99" d="M0 3h4v29H0z"></path><path fill="#9933ff" d="M24 11h4v21h-4z"></path><path fill="#00ccff" d="M0 31h28v4H0z"></path><path fill="#fff35c" d="M0 0h16v4H0z"></path><path fill="#ff6666" d="M24 8V4h-4V0h-4v12h12V8"></path><path class="shadow" d="M24 16v-4h4M16 0v4h-4"></path></g></svg>
          </router-link>
        </v-col>
        <v-col>
          <v-text-field
            label="Search all the GIFs and Stickers"
            variant="solo-filled"
            prepend-inner-icon="mdi-magnify"
            rounded
            auto-select-first
            density="comfortable"
            theme="light"
            v-model="getSearch"
            flat
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavbarHeader',
  setup() {
    const store = useStore();
    const getSearch = ref('');

    watch(getSearch, (newValue) => {
      store.dispatch('updateSearchQuery', newValue);
    });

    return {
      getSearch,
    };
  },
};
</script>

<style scoped>
.v-input__details {
  display: none !important;
}
.v-input__slot::before {
  border-style: none !important;
}
.v-input__details {
  background: red !important;
}
</style>
