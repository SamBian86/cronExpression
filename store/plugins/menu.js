import utils from '@/utils/common'
import { useCache } from '@/utils/storage'
const { KEYS, setMenuDefaultActive, removeMenuDefaultActive, setMenuCollapse, removeMenuCollapse } = useCache()

export function menuPlugin(store) {
  store.subscribe((mutation, state) => {
    // aop切面

    // 记录菜单选中状态
    if (mutation.type === 'menu/SET_DEFAULT_ACTIVE') {
      if (utils.tools.isEqual(state.menu.defaultActive, KEYS.default_menuDefaultActive)) {
        removeMenuDefaultActive()
      } else {
        setMenuDefaultActive(state.menu.defaultActive)
      }
    }

    // 记录菜单展开状态
    if (mutation.type === 'menu/SET_COLLAPSE') {
      if (utils.tools.isEqual(state.menu.collapse, KEYS.default_menuCollapse)) {
        removeMenuCollapse()
      } else {
        setMenuCollapse(state.menu.collapse)
      }
    }
  })
}
