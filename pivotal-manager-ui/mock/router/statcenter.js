export const statcenterRouter = [
  {
    path: '/statcenter',
    component: 'Layout',
    redirect: '/statcenter/realtime',
    name: 'statcenter',
    meta: {
      title: '数据中心',
      icon: 'international'
    },
    children: [
      { // 数据概览
        path: 'overview',
        component: 'statcenter/overview',
        name: 'statcenterOverview',
        meta: {title: '数据概览'}
      },
/*      { // 实时概览
        path: 'realtime',
        component: 'statcenter/realtime',
        name: 'statcenterRealtime',
        meta: {title: '实时概览'}
      },*/
    ]
  }
];
