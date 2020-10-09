export const goodsRouter = [
  {
    path: '/goods',
    component: 'Layout',
    redirect: '/goods/list',
    name: 'goods',
    meta: {
      title: '商品',
      icon: 'guide'
    },
    children: [
      { // 商品管理
        path: 'list',
        component: 'goods/list',
        name: 'goodsList',
        meta: {title: '商品管理'}
      },
      { // 发布商品
        path: 'create',
        component: 'goods/create',
        name: 'goodsCreate',
        hidden: true,
        meta: {title: '发布商品'}
      },
      { // 商品分组
        path: 'tag',
        component: 'goods/tag',
        name: 'goodsTag',
        meta: {title: '商品分组'}
      }
    ]
  }
];
