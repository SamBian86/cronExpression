// 凡是从useCache中取值的,设置完vuex的状态以后,再plugins中对应修改数据,页面中使用vuex的dispatch维护数据
export default {
  namespaced: true,
  state: {
    dynamicRoutes: []
  },
  mutations: {
    SET_DYNAMIC_ROUTES: (state, dynamicRoutes) => {
      state.dynamicRoutes = dynamicRoutes
    }
  },
  actions: {
    SET_DYNAMIC_ROUTES: ({ commit }, data) => {
      commit('SET_DYNAMIC_ROUTES', data)
    }
  },
  getters: {}
}
