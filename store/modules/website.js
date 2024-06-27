import { useCache } from '@/utils/storage'
import layout from '@/config/layout'
const { getLanguage, getToken, getUser, getAuthCode, getAuthInfo, getSSOLoginUrl, getSSOHomeUrl } = useCache()

// 凡是从useCache中取值的,设置完vuex的状态以后,再plugins中对应修改数据,页面中使用vuex的dispatch维护数据
export default {
  namespaced: true,
  state: {
    authCode: getAuthCode(),
    authInfo: getAuthInfo(),
    language: getLanguage(),
    token: getToken(),
    user: getUser(),
    fullScreen: layout.website.fullScreen,
    fullScreenMenuCollapse: layout.website.fullScreenMenuCollapse,
    ssoLoginUrl: getSSOLoginUrl(),
    ssoHomeUrl: getSSOHomeUrl()
  },
  mutations: {
    SET_AUTH_CODE: (state, authCode) => {
      state.authCode = authCode
    },
    SET_AUTH_INFO: (state, authInfo) => {
      state.authInfo = authInfo
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_FULLSCREEN: (state, fullScreen) => {
      state.fullScreen = fullScreen
    },
    SET_FULLSCREEN_MENU_COLLAPSE: (state, fullScreenMenuCollapse) => {
      state.fullScreenMenuCollapse = fullScreenMenuCollapse
    },
    SET_SSO_LOGIN_URL: (state, ssoLoginUrl) => {
      state.ssoLoginUrl = ssoLoginUrl
    },
    SET_SSO_HOME_URL: (state, ssoHomeUrl) => {
      state.ssoHomeUrl = ssoHomeUrl
    }
  },
  actions: {
    SET_AUTH_CODE: ({ commit }, data) => {
      commit('SET_AUTH_CODE', data)
    },
    SET_AUTH_INFO: ({ commit }, data) => {
      commit('SET_AUTH_INFO', data)
    },
    SET_LANGUAGE: ({ commit }, data) => {
      commit('SET_LANGUAGE', data)
    },
    SET_TOKEN({ commit }, data) {
      commit('SET_TOKEN', data)
    },
    SET_USER: ({ commit }, data) => {
      commit('SET_USER', data)
    },
    SET_FULLSCREEN: ({ commit }, data) => {
      commit('SET_FULLSCREEN', data)
    },
    SET_FULLSCREEN_MENU_COLLAPSE: ({ commit }, data) => {
      commit('SET_FULLSCREEN_MENU_COLLAPSE', data)
    },
    SET_SSO_LOGIN_URL: ({ commit }, data) => {
      commit('SET_SSO_LOGIN_URL', data)
    },
    SET_SSO_HOME_URL: ({ commit }, data) => {
      commit('SET_SSO_HOME_URL', data)
    }
  },
  getters: {}
}
