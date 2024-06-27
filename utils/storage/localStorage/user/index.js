import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录用户信息
export function getUser() {
  const user = !getItem(Keys.user) ? Keys.default_user : JSON.parse(getItem(Keys.user)) || Keys.default_user
  return user
}

export function setUser(user = Keys.default_user) {
  setItem(Keys.user, JSON.stringify(user))
}

export function removeUser() {
  removeItem(Keys.user)
}
