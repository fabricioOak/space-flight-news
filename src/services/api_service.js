import Vue from "vue";
import axios from "axios";
import BaseEndpoint from "../utils/base.endpoint";

const ApiService = {
  init() {
    Vue.prototype.$http = axios;
    Vue.prototype.$http.defaults.baseURL = BaseEndpoint.URL;
  },

  get(api) {
    return Vue.prototype.$http.get(api);
  },

};

export default ApiService;
