import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'cookies-js'

Vue.use(Vuex);
let userInfo = window.location.href;
const state = {
  urlReportModule: '',
  urlReport: '',
  urlUser: '',
  userInfo: `${userInfo}`,
};

const mutations = {
  getUserInfo(state, e) {
    state.userInfo = e
  },
  getUrlParam(url) {
  }
};

const actions = {
  reportSubAjax() {

  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions
})
