import Vue from 'vue'
import Vuex from 'vuex'
import {
  queryTrain,
  trainList
} from '@/api'
import * as CTYPES from './ctypes'

Vue.use(Vuex)

const INITIALIZATION = {
  trainsResult: {
    rows: [],
  },
  sites: {
    list: [{
      id: 3,
      name: "北京",
      code: "BJP"
    }, {
      id: 34,
      name: "广州",
      code: "GZQ"
    }],
  },
}

export default new Vuex.Store({
  state: {
    trainsResult: INITIALIZATION.trainsResult,
    departures: INITIALIZATION.sites,
    terminals: INITIALIZATION.sites,
  },
  mutations: {
    updateTrainsResult(state, payload) {
      state.trainsResult = payload || INITIALIZATION.trainsResult
    },
    updateDepartures(state, payload) {
      state.departures = payload || INITIALIZATION.sites
    },
    updateTerminals(state, payload) {
      state.terminals = payload || INITIALIZATION.sites
    },
    switchDeparturesTerminals(state) {
      state.terminals = state.departures
    },
  },
  actions: {
    async [CTYPES.ASYNC_QUERY_TRAIN]({
      commit
    }, payload) {
      const trains = await queryTrain(payload)
      commit('updateTrainsResult', trains)
    },
    async [CTYPES.ASYNC_GET_DEPARTURES]({
      commit
    }, payload) {
      const departures = await trainList({
        name: payload,
      })
      commit('updateDepartures', departures)
    },
    async [CTYPES.ASYNC_GET_TERMINALS]({
      commit
    }, payload) {
      const terminals = await trainList({
        name: payload,
      })
      commit('updateTerminals', terminals)
    },
  },
  getters: {
    [CTYPES.GETTERS_TRAINS_LIST](state) {
      return state.trainsResult.rows || []
    },
    [CTYPES.GETTERS_DEPARTURES](state) {
      return state.departures.list || []
    },
    [CTYPES.GETTERS_TERMINALS](state) {
      return state.terminals.list || []
    },
  },
  modules: {},
})