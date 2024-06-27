import { getItem, setItem, removeItem } from '../api'
import Keys from '../../keys'

// 记录选中的菜单
export function getMenuDefaultActive() {
  const menuDefaultActive = !getItem(Keys.menuDefaultActive)
    ? Keys.default_menuDefaultActive
    : getItem(Keys.menuDefaultActive) || Keys.default_menuDefaultActive
  return menuDefaultActive
}

export function setMenuDefaultActive(menuDefaultActive = Keys.default_menuDefaultActive) {
  setItem(Keys.menuDefaultActive, menuDefaultActive)
}

export function removeMenuDefaultActive() {
  removeItem(Keys.menuDefaultActive)
}

// 记录菜单展开状态
export function getMenuCollapse() {
  const menuCollapse = !getItem(Keys.menuCollapse)
    ? Keys.default_menuCollapse
    : JSON.parse(getItem(Keys.menuCollapse)) || Keys.default_menuCollapse
  return menuCollapse
}

export function setMenuCollapse(menuCollapse = Keys.default_menuCollapse) {
  setItem(Keys.menuCollapse, JSON.stringify(menuCollapse))
}

export function removeMenuCollapse() {
  removeItem(Keys.menuCollapse)
}
