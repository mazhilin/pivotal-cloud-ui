export const systemRouter = [
  {
    path: '/system',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'system',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'lock'
    },
    children: [
      { // 用户管理
        path: 'user',
        component: 'system/user',
        name: 'systemUser',
        meta: {title: '用户管理'}
      },
      { // 角色管理
        path: 'role',
        component: 'system/role',
        name: 'systemRole',
        meta: {title: '角色管理'}
      },
      { // 分配用户
        path: 'role-assigning-users',
        component: 'system/role-assigning-users',
        name: 'systemRoleAssigningUsers',
        hidden: true,
        meta: {title: '分配用户'}
      },
      { // 部门管理
        path: 'sector',
        component: 'system/sector',
        name: 'systemSector',
        meta: {title: '部门管理'}
      },
      { // 菜单管理
        path: 'menu',
        component: 'system/menu',
        name: 'systemMenu',
        meta: {title: '菜单管理'}
      },
    ]
  }
];
