import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录系统语言
export function getLanguage() {
  const language = !getItem(Keys.language) ? Keys.default_language : getItem(Keys.language) || Keys.default_language
  return language
}

export function getDefaultLanguage() {
  const language = Keys.default_language
  return language
}

export function setLanguage(language = Keys.default_language) {
  setItem(Keys.language, language)
}

export function removeLanguage() {
  removeItem(Keys.language)
}
