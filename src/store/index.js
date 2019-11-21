import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default new Vuex.Store({
  state: {
    wantedArr: [],
    watchedArr: [],
    thumbArr: [],
    celebrityArr: []
  },
  mutations,
  actions,
  getters,
});
