import layout from '@/config/layout'
import { useCache } from '@/utils/storage'
const { getMenuDefaultActive, getMenuCollapse } = useCache()

// 凡是从useCache中取值的,设置完vuex的状态以后,再plugins中对应修改数据,页面中使用vuex的dispatch维护数据
export default {
  namespaced: true,
  state: {
    menus: [],
    menuMap: {},
    defaultActive: getMenuDefaultActive(),
    collapse: getMenuCollapse() || layout.menu.collapse
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_MENU_MAP: (state, menuMap) => {
      state.menuMap = menuMap
    },
    SET_DEFAULT_ACTIVE: (state, defaultActive) => {
      state.defaultActive = defaultActive
    },
    SET_COLLAPSE: (state, collapse) => {
      state.collapse = collapse
    }
  },
  actions: {
    SET_MENUS: ({ commit }, data) => {
      const menuMap = {}
      const searchSubs = (subs) => {
        subs &&
          subs.forEach((menu) => {
            menuMap[menu['url']] = menu
          })
      }
      data &&
        data.forEach((menu) => {
          if (menu['subs'] && menu['subs'].length !== 0) {
            searchSubs(menu['subs'])
          } else {
            menuMap[menu['url']] = menu
          }
        })

      commit('SET_MENUS', data)
      commit('SET_MENU_MAP', menuMap)
    },
    SET_MENU_MAP: ({ commit }, data) => {
      commit('SET_MENU_MAP', data)
    },
    SET_DEFAULT_ACTIVE: ({ commit }, data) => {
      commit('SET_DEFAULT_ACTIVE', data)
    },
    SET_COLLAPSE: ({ commit }, data) => {
      commit('SET_COLLAPSE', data)
    }
  },
  getters: {}
}
