// Plugins
import { registerPlugins } from './plugins'

// Components
// @ts-ignore
import App from './App.vue'
import MasonryWall from '@yeger/vue-masonry-wall'
// Composables
import { createApp } from 'vue'
import store from "./store";
import router from "./router";

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.use(store)
app.use(MasonryWall)
app.mount('#app')
