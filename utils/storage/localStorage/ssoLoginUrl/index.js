import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 单点登录 登陆页面
export function getSSOLoginUrl() {
  const ssoLoginUrl = !getItem(Keys.ssoLoginUrl)
    ? Keys.default_ssoLoginUrl
    : getItem(Keys.ssoLoginUrl) || Keys.default_ssoLoginUrl
  return ssoLoginUrl
}

export function setSSOLoginUrl(ssoLoginUrl = Keys.default_ssoLoginUrl) {
  setItem(Keys.ssoLoginUrl, ssoLoginUrl)
}

export function removeSSOLoginUrl() {
  removeItem(Keys.ssoLoginUrl)
}
