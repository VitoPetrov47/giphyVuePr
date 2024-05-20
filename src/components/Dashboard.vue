<template>
  <div style="padding: 200px 0">
    <v-container class="container">
      <div style="margin-bottom: 20px">
        <v-btn-toggle v-model="selectedItem" mandatory>
          <v-btn v-for="(item, index) in items" :key="index" :value="item.value" @click="handleClick(item.value)">
            {{ item.label }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <div v-if="fakeDatabase.length">
        <div class="col-content">
          <div class="box" v-for="item in fakeDatabase" :key="item.id">
            <router-link :to="{ name: 'GifsPage', params: { id: item.id }, query: { item: JSON.stringify(item) }}">
              <img class="img img-sticker" :src="item.images.original.url" alt="gif">
            </router-link>
          </div>
        </div>
        <div v-if="loaderScroll" style="padding: 20px 0; width: 100%; display: flex; justify-content: center; align-content: center">
          <Loader/>
        </div>
      </div>
      <LoaderCards v-if="loader"/>
      <div v-else-if="!fakeDatabase.length">Not Found</div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useStore } from 'vuex';
import LoaderCards from "./LoaderCards.vue";

export default defineComponent({
  name: 'Dashboard',
  components: {LoaderCards},
  setup() {
    const loader = ref<boolean>(true);
    const loaderScroll = ref<boolean>(false);
    const APIKEY = 'oIo1yLibaS9q8Ycqziox4xbzp6AclUaX';
    const selectedItem = ref<string>('gifs');
    const items = ref([
      { label: 'GIFs', value: 'gifs' },
      { label: 'Stickers', value: 'stickers' },
      { label: 'Clips', value: 'videos' }
    ]);
    const limit = ref<number>(20);
    const store = useStore();
    const searchQuery = computed(() => store.getters.searchQuery);

    watch(searchQuery, (newValue) => {
      loader.value = true;
      limit.value = 20;
      updateFakeDatabase(selectedItem.value, newValue, true);
    });

    const fakeDatabase = ref([]);

    const handleClick = async (value) => {
      selectedItem.value = value;
      await store.dispatch('updateSelectedItem', value);
      loader.value = true;
      limit.value = 20;
      await updateFakeDatabase(value, searchQuery.value, true);
    }

    const updateFakeDatabase = async (value, search = '', reset = false) => {
      loader.value = true;
      const gf = new GiphyFetch(APIKEY);
      let gifs;
      if (search === '') {
        ({ data: gifs } = await gf.trending({ type: value, limit: limit.value }));
      } else {
        ({ data: gifs } = await gf.search(search, { type: value, limit: limit.value }));
      }
      if (reset) {
        fakeDatabase.value = gifs;
      } else {
        fakeDatabase.value.push(...gifs);
      }
      loader.value = false;
    }

    const handleScroll = async () => {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottomOfWindow && !loader.value) {
        loaderScroll.value = true
        setTimeout(async () => {
          limit.value += 10;
          await updateFakeDatabase(selectedItem.value, searchQuery.value);
          loaderScroll.value = false;
        }, 1500);
      }
    }

    onMounted(() => {
      const loadInitialGifs = async () => {
        await updateFakeDatabase(selectedItem.value, '', true);
        loader.value = false;
      }
      loadInitialGifs();
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      loader,
      loaderScroll,
      selectedItem,
      items,
      handleClick,
      fakeDatabase,
      updateFakeDatabase,
      searchQuery
    };
  }
});
</script>

<style scoped>

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
