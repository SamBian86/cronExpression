import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录用户信息
export function getAuthInfo() {
  const authInfo = !getItem(Keys.authInfo) ? Keys.default_authInfo : JSON.parse(getItem(Keys.authInfo)) || Keys.default_authInfo
  return authInfo
}

export function setAuthInfo(authInfo = Keys.default_authInfo) {
  setItem(Keys.authInfo, JSON.stringify(authInfo))
}

export function removeAuthInfo() {
  removeItem(Keys.authInfo)
}
