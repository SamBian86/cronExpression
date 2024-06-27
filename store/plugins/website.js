import utils from '@/utils/common'
import { useCache } from '@/utils/storage'
const {
  KEYS,
  setLanguage,
  removeUser,
  setUser,
  removeToken,
  setToken,
  removeAuthCode,
  setAuthCode,
  removeAuthInfo,
  setAuthInfo,
  setSSOLoginUrl,
  removeSSOLoginUrl,
  setSSOHomeUrl,
  removeSSOHomeUrl
} = useCache()

export function websitePlugin(store) {
  store.subscribe((mutation, state) => {
    // aop切面

    // 记录单点登录使用的code
    if (mutation.type === 'website/SET_AUTH_CODE') {
      if (utils.tools.isEqual(state.website.authCode, KEYS.default_authCode)) {
        removeAuthCode()
      } else {
        setAuthCode(state.website.authCode)
      }
    }

    // 记录单点登录成功以后返回的信息
    if (mutation.type === 'website/SET_AUTH_INFO') {
      if (utils.tools.isEqual(state.website.authInfo, KEYS.default_authInfo)) {
        removeAuthInfo()
      } else {
        setAuthInfo(state.website.authInfo)
      }
    }

    // 记录语言
    if (mutation.type === 'website/SET_LANGUAGE') {
      setLanguage(state.website.language)
    }

    // 记录用户
    if (mutation.type === 'website/SET_USER') {
      if (utils.tools.isEqual(state.website.user, KEYS.default_user)) {
        removeUser()
      } else {
        setUser(state.website.user)
      }
    }

    // 记录token
    if (mutation.type === 'website/SET_TOKEN') {
      if (utils.tools.isEqual(state.website.token, KEYS.default_token)) {
        removeToken()
      } else {
        setToken(state.website.token)
      }
    }

    // 记录SSO的登录页面
    if (mutation.type === 'website/SET_SSO_LOGIN_URL') {
      if (utils.tools.isEqual(state.website.ssoLoginUrl, KEYS.default_ssoLoginUrl)) {
        removeSSOLoginUrl()
      } else {
        setSSOLoginUrl(state.website.ssoLoginUrl)
      }
    }

    // 记录SSO的首页
    if (mutation.type === 'website/SET_SSO_HOME_URL') {
      if (utils.tools.isEqual(state.website.ssoHomeUrl, KEYS.default_ssoHomeUrl)) {
        removeSSOHomeUrl()
      } else {
        setSSOHomeUrl(state.website.ssoHomeUrl)
      }
    }
  })
}
