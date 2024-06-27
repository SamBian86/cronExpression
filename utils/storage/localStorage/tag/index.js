import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录用户信息
export function getTags() {
  const tags = !getItem(Keys.tags) ? Keys.default_tags : JSON.parse(getItem(Keys.tags)) || Keys.default_tags
  return tags
}

export function setTags(tags = Keys.default_tags) {
  setItem(Keys.tags, JSON.stringify(tags))
}

export function removeTags() {
  removeItem(Keys.tags)
}
