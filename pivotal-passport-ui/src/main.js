import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import EVue from 'evue'
import VueClipboard from 'vue-clipboard2'
import Mixin from './mixins/common'; // global Mixins
Vue.mixin(Mixin);
Vue.use(EVue)
Vue.use(VueClipboard)
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
// vue-echarts 引入部分
import ECharts from 'vue-echarts'
import 'echarts-gl'

Vue.component('v-chart', ECharts);
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import {mockXHR} from '../mock'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;
/** 导入公共方法*/
import commonFun from './utils/common';

/** 注入vue属性里*/
Vue.prototype.commonFun = commonFun;
const $vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
window.vm = $vue
