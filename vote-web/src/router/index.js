import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: 'changePassword',
        name: 'changePassword',
        component: () => import('@/views/login/changePassword'),
        meta: {title: '修改密码', icon: 'home'}
      },
      {
        path: 'admin-list',
        name: 'admin-list',
        component: () => import('@/views/admin-manage/index'),
        meta: {title: '管理员管理', icon: 'home'}
      }

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/creatorList',
    children: [
    {
      path: 'creatorList',
      name: 'creatorList',
      component: () => import('@/views/vote-creator-manage'),
      meta: {title: '创建员列表', icon: 'home'}
    }
   ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/voteList',
    children: [
      {
      path: 'voteList',
      name: 'voteList',
      component: () => import('@/views/vote-manage/index'),
      meta: {title: '投票列表', icon: 'home'}
      },
      {
        path: 'whitelist',
        name: 'whitelist',
        component: () => import('@/views/vote-manage/whitelist'),
        meta: {title: '白名单', icon: 'home'}
      },
      {
        path: 'blacklist',
        name: 'blacklist',
        component: () => import('@/views/vote-manage/blacklist'),
        meta: {title: '黑名单', icon: 'home'}
      },
      // {
      //   path: 'voteDetails',
      //   name: 'voteDetails',
      //   component: () => import('@/views/vote-manage/voteDetails'),
      //   meta: {title: '投票详情', icon: 'home'}
      // }
    ]
  },
  {path: '*', redirect: '/404', hidden: true},
];


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

