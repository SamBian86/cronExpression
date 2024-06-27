import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录用户信息
export function getAuthCode() {
  const authCode = !getItem(Keys.authCode) ? Keys.default_authCode : getItem(Keys.authCode) || Keys.default_authCode
  return authCode
}

export function setAuthCode(authCode = Keys.default_authCode) {
  setItem(Keys.authCode, authCode)
}

export function removeAuthCode() {
  removeItem(Keys.authCode)
}
