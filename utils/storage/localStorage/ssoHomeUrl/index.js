import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 单点登录 登陆页面
export function getSSOHomeUrl() {
  const ssoHomeUrl = !getItem(Keys.ssoHomeUrl) ? Keys.default_ssoHomeUrl : getItem(Keys.ssoHomeUrl) || Keys.default_ssoHomeUrl
  return ssoHomeUrl
}

export function setSSOHomeUrl(ssoHomeUrl = Keys.default_ssoHomeUrl) {
  setItem(Keys.ssoHomeUrl, ssoHomeUrl)
}

export function removeSSOHomeUrl() {
  removeItem(Keys.ssoHomeUrl)
}
