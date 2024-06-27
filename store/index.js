import { createStore } from 'vuex'

// modules
import website from './modules/website'
import router from './modules/router'
import menu from './modules/menu'
import tag from './modules/tag'

// plugin
import { websitePlugin } from './plugins/website'
import { routerPlugin } from './plugins/router'
import { menuPlugin } from './plugins/menu'
import { tagPlugin } from './plugins/tag'

// getters
import getters from './getters'

const store = createStore({
  // state?: S | (() => S);
  // getters?: GetterTree<S, S>;
  // actions?: ActionTree<S, S>;
  // mutations?: MutationTree<S>;
  modules: {
    website,
    router,
    menu,
    tag
  },
  plugins: [websitePlugin, routerPlugin, menuPlugin, tagPlugin],
  getters
  // strict?: boolean;
  // devtools?: boolean;
  // strict: true
})

export function setupStore(app) {
  // console.log(`vuex ready`)
  // console.log(store)
  app.use(store)
}

export default store
