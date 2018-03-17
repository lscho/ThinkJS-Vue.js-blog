// 登录
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/view/common/login.vue'], resolve) }
}

// 404
export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404 - 页面不存在'
  },
  component: resolve => { require(['@/view/common/404.vue'], resolve) }
}

// 后台相关路由
export const adminRouter = [{
  path: '/',
  name: 'Admin',
  meta: {
    title: '后台',
    requiresAuth: true
  },
  redirect: '/home',
  component: resolve => { require(['@/view/Main.vue'], resolve) },
  children: [
    { path: 'home', name: 'AdminHome', meta: { title: '控制台', requiresAuth: true }, component: resolve => { require(['@/view/home.vue'], resolve) } },
    { path: 'content/save', name: 'AdminContentSave', meta: { title: '内容编辑', requiresAuth: true }, component: resolve => { require(['@/view/content/save.vue'], resolve) } },
    { path: 'content/list', name: 'AdminContentList', meta: { title: '内容列表', requiresAuth: true }, component: resolve => { require(['@/view/content/list.vue'], resolve) } },
    { path: 'category/save', name: 'AdminCategorySave', meta: { title: '分类编辑', requiresAuth: true }, component: resolve => { require(['@/view/category/save.vue'], resolve) } },
    { path: 'category/list', name: 'AdminCategoryList', meta: { title: '分类列表', requiresAuth: true }, component: resolve => { require(['@/view/category/list.vue'], resolve) } },
    { path: 'tag/save', name: 'AdminTagSave', meta: { title: '标签编辑', requiresAuth: true }, component: resolve => { require(['@/view/tag/save.vue'], resolve) } },
    { path: 'tag/list', name: 'AdminTagList', meta: { title: '标签列表', requiresAuth: true }, component: resolve => { require(['@/view/tag/list.vue'], resolve) } },
    { path: 'user/info', name: 'AdminUserInfo', meta: { title: '个人资料', requiresAuth: true }, component: resolve => { require(['@/view/user/info.vue'], resolve) } },
    { path: 'site', name: 'AdminSystem', meta: { title: '系统设置', requiresAuth: true }, component: resolve => { require(['@/view/site/save.vue'], resolve) } }
  ]
}]

// 所有上面定义的路由全部写在一起
export const routers = [
  loginRouter,
  ...adminRouter,
  page404
]
