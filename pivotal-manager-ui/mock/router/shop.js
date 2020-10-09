export const shopRouter = [
  {
    path: '/shop',
    component: 'Layout',
    redirect: '/shop/feature-list',
    name: 'shop',
    meta: {
      title: '店铺',
      icon: 'example'
    },
    children: [
      { // 微页面列表
        path: 'feature-list',
        component: 'shop/feature/list',
        name: 'featureList',
        meta: {title: '微页面'}
      },
      { // 微页面编辑页
        path: 'feature-create',
        component: 'shop/feature/create/edit',
        name: 'featureCreate',
        hidden: true,
        meta: {title: '编辑微页面'}
      },
      { // 微集合
        path: 'clump',
        component: 'shop/clump',
        name: 'clump',
        meta: {title: '微集合'}
      },
      { // 素材中心
        path: 'attachment',
        component: 'shop/attachment',
        name: 'attachment',
        meta: {title: '素材中心'}
      },
      { // 钉钉通知
        path: 'ding',
        component: 'shop/dingding',
        name: 'ding',
        meta: {title: '钉钉通知'}
      }
    ]
  }
];
