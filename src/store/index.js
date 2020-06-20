import Vue from "vue";
import Vuex from "vuex";
import player from './modules/player.js';
//import 'es6-promise/auto'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    player
  }
});