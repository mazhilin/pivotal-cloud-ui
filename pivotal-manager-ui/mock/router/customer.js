export const customerRouter = [
  {
    path: '/customer',
    component: 'Layout',
    redirect: '/customer/list',
    name: 'customer',
    meta: {
      title: '客户',
      icon: 'peoples'
    },
    children: [
      { // 客户查询
        path: 'list',
        component: () => 'customer/list',
        name: 'customerList',
        meta: {title: '客户查询'}
      },
      { // 标签管理
        path: 'tag',
        component: () => 'customer/tag',
        name: 'customerTag',
        meta: {title: '标签管理'}
      },
      { // 创建标签
        path: 'creat-tag',
        component: () => 'customer/create-tag',
        hidden: true,
        name: 'customerCreateTag',
        meta: {title: '创建标签'}
      },
      { // 客户中心
        path: 'detail',
        component: () => 'customer/detail',
        hidden: true,
        name: 'customerDetail',
        meta: {title: '客户中心'}
      }
    ]
  }
];
