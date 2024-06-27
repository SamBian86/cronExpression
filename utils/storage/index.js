import {
  getAuthCode,
  setAuthCode,
  removeAuthCode,
  getAuthInfo,
  setAuthInfo,
  removeAuthInfo,
  getLanguage,
  setLanguage,
  removeLanguage,
  getDefaultLanguage,
  getUser,
  setUser,
  removeUser,
  getToken,
  setToken,
  removeToken,
  getMenuDefaultActive,
  setMenuDefaultActive,
  removeMenuDefaultActive,
  getMenuCollapse,
  setMenuCollapse,
  removeMenuCollapse,
  getTags,
  setTags,
  removeTags,
  getSSOLoginUrl,
  setSSOLoginUrl,
  removeSSOLoginUrl,
  getSSOHomeUrl,
  setSSOHomeUrl,
  removeSSOHomeUrl
} from './localStorage'
import KEYS from './keys'

export function useCache() {
  return {
    KEYS,
    getAuthCode,
    setAuthCode,
    removeAuthCode,
    getAuthInfo,
    setAuthInfo,
    removeAuthInfo,
    getLanguage,
    setLanguage,
    removeLanguage,
    getDefaultLanguage,
    getUser,
    setUser,
    removeUser,
    getToken,
    setToken,
    removeToken,
    getMenuDefaultActive,
    setMenuDefaultActive,
    removeMenuDefaultActive,
    getMenuCollapse,
    setMenuCollapse,
    removeMenuCollapse,
    getTags,
    setTags,
    removeTags,
    getSSOLoginUrl,
    setSSOLoginUrl,
    removeSSOLoginUrl,
    getSSOHomeUrl,
    setSSOHomeUrl,
    removeSSOHomeUrl
  }
}
