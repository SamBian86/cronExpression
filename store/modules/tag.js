import { useCache } from '@/utils/storage'
const { getTags } = useCache()

// 凡是从useCache中取值的,设置完vuex的状态以后,再plugins中对应修改数据,页面中使用vuex的dispatch维护数据
export default {
  namespaced: true,
  state: {
    tags: getTags()
  },
  mutations: {
    SET_TAGS: (state, tags) => {
      state.tags = tags
    }
  },
  actions: {
    SET_TAGS: ({ commit }, data) => {
      commit('SET_TAGS', data)
    }
  },
  getters: {}
}
