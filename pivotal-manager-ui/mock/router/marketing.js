/** 优惠券路由*/
export const marketingRouter = [
  {
    path: '/marketing',
    component: 'Layout',
    redirect: '/marketing/list',
    name: 'marketing',
    meta: {
      title: '应用中心',
      icon: 'example'
    },
    children: [
      { // 优惠券列表
        path: 'coupon-list',
        component: 'appcenter/marketing/coupon/list',
        name: 'couponList',
        meta: {title: '优惠券'}
      },
      { // 新建优惠券
        path: 'coupon-create',
        component: 'appcenter/marketing/coupon/create',
        name: 'couponCreate',
        hidden: true,
        noCache: true,
        meta: {title: '新建'}
      },
      { // 发券宝列表
        path: 'targeted-list',
        component: 'appcenter/marketing/targeted/list',
        name: 'targetedList',
        meta: {title: '发券宝'}
      },
      { // 新建发券宝
        path: 'targeted-create',
        component: 'appcenter/marketing/targeted/create',
        name: 'targetedCreate',
        hidden: true,
        noCache: true,
        meta: {title: '新建发券宝'}
      },
      { // 新建裂变优惠券
        path: 'split-create',
        component: 'appcenter/marketing/targeted/split-create',
        name: 'splitCreate',
        hidden: true,
        noCache: true,
        meta: {title: '新建裂变优惠券'}
      },
      { // 优惠码列表
        path: 'promo-code-list',
        component: 'appcenter/marketing/promocode/list',
        name: 'promoCodeList',
        meta: {title: '优惠码'}
      },
      { // 刮刮乐列表
        path: 'lucky-card-list',
        component: 'appcenter/play/lucky-card/list',
        name: 'luckyCardList',
        meta: {title: '刮刮乐'}
      },
      { // 新建刮刮乐
        path: 'lucky-card-create',
        component: 'appcenter/play/lucky-card/create',
        name: 'luckyCardCreate',
        hidden: true,
        noCache: true,
        meta: {title: '新建刮刮乐'}
      },
    ]
  }
];
