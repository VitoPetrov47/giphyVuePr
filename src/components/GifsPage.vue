<template>
  <v-container class="container">
    <v-row v-if="gif" style="padding-top: 150px">
      <v-col cols="12">
        <h1 class="display-2 text-center gif-title">{{ gif.title }}</h1>
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <v-img
               :src="gif.images.original.url"
               :alt="gif.title" aspect-ratio="16/9" class="mx-auto img img-sticker">
        </v-img>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn @click="shareGif" color="primary" class="share-button">Поделиться</v-btn>
      </v-col>
      <v-col cols="12" class="text-center mt-5">
        <router-link class="gp-link" :to="{ name: 'AuthorPage', params: { id: gif.user.username }, query: { item: JSON.stringify(gif.user) }}">
          Перейти на страницу автора
        </router-link>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <Loader />
      </v-col>
    </v-row>

    <div style="padding: 50px 0">
      <h1 style="margin-bottom: 20px; text-align: center">Other content </h1>
      <div v-if="randomStickers.length">
        <div class="col-content">
          <div class="box" v-for="item in randomStickers" :key="item.id">
            <router-link :to="{ name: 'GifsPage', params: { id: item.id }, query: { item: JSON.stringify(item) }}">
              <img class="img img-sticker" :src="item.images.original.url" alt="gif">
            </router-link>
          </div>
        </div>
        <div v-if="loader" style="padding: 20px 0; width: 100%; display: flex; justify-content: center; align-content: center">
          <Loader/>
        </div>
      </div>
      <LoaderCards v-else/>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Loader from "./Loader.vue";
import { loadContent } from "../assets/contentLoader";
import {useStore} from "vuex";

export default defineComponent({
  name: 'GifsPage',
  components: {Loader},
  setup: function () {
    const store = useStore();
    const route = useRoute();
    const gif = ref<object>(null);
    const randomStickers = ref([]);
    let loader = ref(true);
    const shareGif = () => {
      if (navigator.share) {
        navigator.share({
          title: gif.value.title,
          url: gif.value.images.original.url,
        })
          .then(() => console.log("Successfully"))
          .catch((error) => console.error("Error Sharing", error));
      } else {
        alert("Sorry, your browser does not support web sharing.");
      }
    };

    const loadRandomStickers = async () => {
      const selectedItem = store.getters.selectedItem;
      const stickersData = await loadContent(selectedItem, '', 24);
      randomStickers.value = stickersData;
    };

    onMounted( async () => {
      const gifData = route.query.item ? JSON.parse(<string>route.query.item) : null;
      gif.value = gifData;
      console.log('GIF ID:', route.params.id);
      console.log('GIF Details:', gif.value);
      loader.value = true;
      const selectedItem = store.getters.selectedItem;
      await loadRandomStickers(selectedItem);
      loader.value = false;
    });

    return {
      gif,
      shareGif,
      randomStickers,
      loader
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
.gif-title {
  text-align: center;
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
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

.col-content {
  columns: 4;
  column-gap: 20px;
}
.box {
  width: 100%;
  margin-bottom: 10px;
}
.img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.img-sticker {
  width: 100%;
  background:
    url("../src/assets/images/cardBg.png")
    center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
}
@media (max-width: 1400px) {
  .col-content {
    columns: 3;
  }
}
@media (max-width: 1200px) {
  .col-content {
    columns: 2;
  }
}
@media (max-width: 900px) {
  .col-content {
    columns: 1;
  }
}
</style>
