import utils from '@/utils/common'
import { useCache } from '@/utils/storage'
const { KEYS, setTags, removeTags } = useCache()

export function tagPlugin(store) {
  store.subscribe((mutation, state) => {
    // aop切面

    // 保存所有tags
    if (mutation.type === 'tag/SET_TAGS') {
      if (utils.tools.isEqual(state.tag.tags, KEYS.default_tags)) {
        removeTags()
      } else {
        setTags(state.tag.tags)
      }
    }
  })
}
