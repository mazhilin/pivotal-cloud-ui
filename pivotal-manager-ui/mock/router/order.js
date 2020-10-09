
export const orderRouter = [
  {
    path: '/order',
    component: 'Layout',
    redirect: '/order/list',
    name: 'order',
    meta: {
      title: '订单',
      icon: 'form'
    },
    children: [
      { // 订单查询
        path: 'list',
        component: 'order/list',
        name: 'orderList',
        meta: {title: '订单查询'}
      },
      { // 订单详情
        path: 'detail',
        component: 'order/detail',
        name: 'orderDetail',
        hidden: true,
        meta: {title: '订单详情'}
      },
      { // 批量发货
        path: 'delivery',
        component: 'order/delivery',
        name: 'orderDelivery',
        hidden: true,
        meta: {title: '批量发货'}
      },
      { // 退款维权
        path: 'refunds',
        component: 'order/refunds',
        name: 'orderRefunds',
        meta: {title: '退款维权'}
      },
      { // 退款维权详情
        path: 'refunds-detail',
        component: 'order/detail',
        name: 'orderRefundsDetail',
        hidden: true,
        meta: {title: '订单详情'}
      },
      { // 批量退款
        path: 'batch-refund',
        component: 'order/batch-refund',
        name: 'orderBatchRefund',
        hidden: true,
        meta: {title: '批量退款'}
      },
      { // 快递发货
        path: 'express',
        component: 'order/express',
        name: 'orderExpress',
        hidden: true,
        meta: {title: '快递发货'}
      }
    ]
  }
];
