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
    { path: 'home', name: 'Home', meta: { title: '控制台', requiresAuth: true }, component: resolve => { require(['@/view/home.vue'], resolve) } },
    { path: 'content/save', name: 'ContentSave', meta: { title: '内容编辑', requiresAuth: true }, component: resolve => { require(['@/view/content/save.vue'], resolve) } },
    { path: 'content/list', name: 'ContentList', meta: { title: '内容列表', requiresAuth: true }, component: resolve => { require(['@/view/content/list.vue'], resolve) } },
    { path: 'page/save', name: 'ContentSave', meta: { title: '页面编辑', requiresAuth: true }, component: resolve => { require(['@/view/page/save.vue'], resolve) } },
    { path: 'page/list', name: 'ContentList', meta: { title: '页面列表', requiresAuth: true }, component: resolve => { require(['@/view/page/list.vue'], resolve) } },
    { path: 'category/save', name: 'CategorySave', meta: { title: '分类编辑', requiresAuth: true }, component: resolve => { require(['@/view/category/save.vue'], resolve) } },
    { path: 'category/list', name: 'CategoryList', meta: { title: '分类列表', requiresAuth: true }, component: resolve => { require(['@/view/category/list.vue'], resolve) } },
    { path: 'comment/save', name: 'CommentSave', meta: { title: '分类编辑', requiresAuth: true }, component: resolve => { require(['@/view/comment/save.vue'], resolve) } },
    { path: 'comment/list', name: 'CommentList', meta: { title: '分类列表', requiresAuth: true }, component: resolve => { require(['@/view/comment/list.vue'], resolve) } },
    { path: 'tag/save', name: 'TagSave', meta: { title: '标签编辑', requiresAuth: true }, component: resolve => { require(['@/view/tag/save.vue'], resolve) } },
    { path: 'tag/list', name: 'TagList', meta: { title: '标签列表', requiresAuth: true }, component: resolve => { require(['@/view/tag/list.vue'], resolve) } },
    { path: 'user/info', name: 'UserInfo', meta: { title: '个人资料', requiresAuth: true }, component: resolve => { require(['@/view/user/info.vue'], resolve) } },
    { path: 'user/password', name: 'UserPassword', meta: { title: '修改密码', requiresAuth: true }, component: resolve => { require(['@/view/user/password.vue'], resolve) } },
    { path: 'config', name: 'System', meta: { title: '系统设置', requiresAuth: true }, component: resolve => { require(['@/view/config/save.vue'], resolve) } }
  ]
}]

// 所有上面定义的路由全部写在一起
export const routers = [
  loginRouter,
  ...adminRouter,
  page404
]
