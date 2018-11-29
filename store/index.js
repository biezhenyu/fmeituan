import Vue from 'Vue';
import Vuex from 'vuex';
import home from './modules/home'
import geo from './modules/geo'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    home,
    geo
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      // 获取菜单
      const {status:status2, data: {menu}} = await app.$axios.get(`http://127.0.0.1:3000/geo/menu`)
      commit('home/setMenu', status2 === 200 ? menu : [])

      // 获取市区
      const {status, data: {province, city}} = await app.$axios.get('http://127.0.0.1:3000/geo/getPosition')
      commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
    }
  }
})

export default store

