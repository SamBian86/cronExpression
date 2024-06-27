const getters = {
  website_authCode: (state) => state.website.authCode,
  website_authInfo: (state) => state.website.authInfo,
  website_language: (state) => state.website.language,
  website_token: (state) => state.website.token,
  website_user: (state) => state.website.user,
  website_fullScreen: (state) => state.website.fullScreen,
  website_fullScreenMenuCollapse: (state) => state.website.fullScreenMenuCollapse,
  website_ssoLoginUrl: (state) => state.website.ssoLoginUrl,
  website_ssoHomeUrl: (state) => state.website.ssoHomeUrl,
  router_dynamicRoutes: (state) => state.router.dynamicRoutes,
  menu_menus: (state) => state.menu.menus,
  menu_menuMap: (state) => state.menu.menuMap,
  menu_defaultActive: (state) => state.menu.defaultActive,
  menu_collapse: (state) => state.menu.collapse,
  tag_tags: (state) => state.tag.tags
}
export default getters
