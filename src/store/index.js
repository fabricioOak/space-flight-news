import Vue from 'vue'
import Vuex from 'vuex'

import ArticleService from '../services/article_service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    getArticles({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true);
        ArticleService.getArticles()
          .then(response => {
            commit('setLoading', false);
            resolve(response);
          })
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },
  }
})
