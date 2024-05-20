// store/index.ts
  import { createStore } from 'vuex';

export default createStore({
  state: {
    searchQuery: '',
    selectedItem: 'gifs'
  },
  mutations: {
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setSelectedItem(state, selectedItem) {
      state.selectedItem = selectedItem;
    }
  },
  actions: {
    updateSearchQuery({ commit }, query) {
      commit('setSearchQuery', query);
    },
    updateSelectedItem({ commit }, selectedItem) {
      commit('setSelectedItem', selectedItem);
    }
  },
  getters: {
    searchQuery: (state) => state.searchQuery,
    selectedItem: (state) => state.selectedItem
  }
});
