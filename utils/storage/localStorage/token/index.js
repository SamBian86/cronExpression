import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录Token
export function getToken() {
  const user = !getItem(Keys.token) ? Keys.default_token : getItem(Keys.token) || Keys.default_token
  return user
}

export function setToken(token = Keys.default_token) {
  setItem(Keys.token, `${token}`)
}

export function removeToken() {
  removeItem(Keys.token)
}
