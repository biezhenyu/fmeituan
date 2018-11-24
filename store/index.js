import Vue from 'Vue';
import Vuex from 'vuex';
import home from './modules/home'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    home
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      setTimeout(() => {
        const menu = [{
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
          }]
        }, {
          type: 'takeout',
          name: '外卖',
          child: [{
            title: '外卖',
            child: ['美团外卖']
          }]
        }, {
          type: 'hotel',
          name: '酒店',
          child: [{
            title: '酒店星级',
            child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
          }]
        }];
        commit('home/setMenu', menu)
      }, 100)
    }
  }
})

export default store

