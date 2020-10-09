import {constantRoutes} from '@/router'
import {getRouters} from '@/api/router'
import Layout from '@/layout/index'

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

console.log('resolve:', resolve('src'))

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
};

const actions = {
  // 生成路由
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      // 请求路由数据
      // console.log('测试用户角色', roles)
      /** 测试用户角色*/
      let currentRoles = roles.length ? roles[0] : '';
      getRouters({roles: currentRoles}).then(res => {
        // console.log('请求路由数据', res)
        const accessedRoutes = filterAsyncRouter(res.data);
        accessedRoutes.push({path: '*', redirect: '/404', hidden: true})
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes)
      });
      /* getRouters().then(res => {

         const accessedRoutes = filterAsyncRoutes(res.data);
         accessedRoutes.push({path: '*', redirect: '/404', hidden: true})
         commit('SET_ROUTES', accessedRoutes)
         resolve(accessedRoutes)

         console.log('请求路由数据===', res)
       });*/


      /* let accessedRoutes;
       if (roles.includes('admin')) {
         accessedRoutes = asyncRoutes || []
       } else {
         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
       }
       commit('SET_ROUTES', accessedRoutes)
       resolve(accessedRoutes)*/
    })
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        let path = JSON.parse(JSON.stringify(route.component))
        route.component = resolve => require([`@/views/${path}`], resolve);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
