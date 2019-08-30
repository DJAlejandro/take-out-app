import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countAll:0,
    priceAll:0,
    isShow:false
  },
  mutations: {
    summary (state,data) {
      state.countAll=data.count
      state.priceAll=data.price
    },
    toggleShow(state,data){
      state.isShow=data
    }
  },
  actions: {

  }
})
