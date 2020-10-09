const sector = [
  {
    id: 1,
    name: 'EVue科技',
    status: 0,
    createTime: "2019-12-21 14:57:24",
    parentId: 0,
    children: [
      {
        id: 2,
        name: '广州分公司',
        status: 0,
        createTime: "2019-12-21 20:27:24",
        parentId: 1,
        children: [
          {
            id: 4,
            name: '财务部',
            status: 0,
            parentId: 2,
            createTime: "2019-12-21 20:27:24",
          },
          {
            id: 5,
            name: '研发部',
            status: 0,
            parentId: 2,
            createTime: "2019-12-21 20:27:24",
          },
          {
            id: 6,
            name: 'IT部',
            status: 0,
            parentId: 2,
            createTime: "2019-12-21 20:27:24",
          },
        ]
      },
      {
        id: 3,
        name: '深圳分公司',
        status: 1,
        createTime: "2019-12-21 20:37:14",
        children: [
          {
            id: 7,
            name: '营销部',
            status: 0,
            parentId: 3,
            createTime: "2019-12-21 20:27:24",
          },
          {
            id: 8,
            name: '市场部',
            status: 0,
            parentId: 3,
            createTime: "2019-12-21 20:27:24",
          },
        ]
      },
    ]
  }
];
export default [
  {
    url: '/list',
    type: 'get',
    response: config => {
      const {name} = config.query;
      let mockList = sector.filter(item => {
        return !(name && item.name !== +name);
      });
      return {
        code: 20000,
        data: {
          total: sector.length,
          items: mockList
        }
      }
    }
  }
]
