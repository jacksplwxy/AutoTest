import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    inputValue: ''
  },
  mutations: {
    changeInputValue (state, palyload) {
      state.inputValue = palyload
    }
  }
})

export default store
