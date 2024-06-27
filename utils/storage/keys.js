const prefix = 'CNC_'

const KEYS = {
  // 单点登录 登陆页面
  ssoLoginUrl: 'ssoLoginUrl',
  // 单点登录 系统选择主页
  ssoHomeUrl: 'ssoHomeUrl',
  // 单点登录授权code
  authCode: 'authCode',
  // 单点登录成功后的信息
  authInfo: 'authInfo',
  // 系统语言
  language: 'language', // key
  // token
  token: 'token',
  // 用户信息
  user: 'user',
  // 默认选中的菜单
  menuDefaultActive: 'menuDefaultActive',
  // 菜单展开状态
  menuCollapse: 'menuCollapse',
  // tags
  tags: 'tags'
}

const DEFAULT_VALUE = {
  default_ssoLoginUrl: '', // 默认单点登录 登录页面地址
  default_ssoHomeUrl: '', // 默认单点登录 系统选择主页
  default_authCode: '', // 默认单点登录授权code
  default_authInfo: {}, // 默认单点登录成功后的信息
  default_language: 'zh_CN', // 系统默认语言
  default_token: '', // 默认token
  default_user: {}, // 默认用户信息
  default_menuDefaultActive: '', // 默认首页
  default_menuCollapse: '', // 菜单展开状态
  default_tags: [] // 保存所有打开过的tags
}

// 添加前缀
Object.keys(KEYS).forEach((item) => {
  if (item !== 'ssoLoginUrl' && item !== 'ssoHomeUrl') {
    KEYS[item] = prefix + KEYS[item]
  }
})

export default {
  ...KEYS,
  ...DEFAULT_VALUE
}
