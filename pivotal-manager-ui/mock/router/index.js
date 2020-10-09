/** 创建路由*/
import {deepClone} from '../../src/utils/index.js'
// 系统管理
import {systemRouter} from './system'
// 店铺
import {shopRouter} from './shop'
// 商品
import {goodsRouter} from './goods'
// 订单
import {orderRouter} from './order'
// 客户
import {customerRouter} from './customer'
// 应用中心-优惠券
import {marketingRouter} from './marketing'
// 数据概览
import {statcenterRouter} from './statcenter'

export default [
  {
    url: '/routes',
    type: 'get',
    response: config => {
      const {roles} = config.query;
      let routes = deepClone([...shopRouter, ...goodsRouter, ...orderRouter, ...customerRouter, ...marketingRouter]);
      // 管理员角色
      if (roles === 'admin') {
        routes = deepClone([...systemRouter, ...shopRouter, ...goodsRouter, ...orderRouter, ...customerRouter, ...marketingRouter, ...statcenterRouter]);
      }
      return {
        code: 20000,
        data: routes
      }
    }
  },
]
