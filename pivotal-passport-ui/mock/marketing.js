import Mock from 'mockjs'

const type = [
  {
    title: '满减券',
    content() {
      let rand = Math.random(0, 2);
      return `满${(rand * 10).toFixed(2)}减${(rand * 10 - 20).toFixed(2)}元`;
    },
    giftFun() {
      return '刮刮乐奖品1'
    },
  },
  {
    title: '折扣券',
    content() {
      let rand = Math.random(0, 1);
      return `打${rand.toFixed(2)}折`;
    },
    giftFun() {
      return '刮刮乐奖品2'
    },
  },
  {
    title: '随机金额券',
    content() {
      let rand = Math.random(0, 2);
      return `无门槛,减${(rand * 10).toFixed(2)}到${(rand * 10 + 20).toFixed(2)}元`;
    },
    giftFun() {
      return '刮刮乐奖品3'
    },
  },
];
const List = [];
const luckyCard = [];
const Year = new Date().getFullYear();
const Month = new Date().getMonth() + 1;
for (let i = 0; i < 1000; i++) {
  let typeIndex = 0;
  let random = Math.random(0, 1) * 10;
  if (random > 3 && random < 6) {
    typeIndex = 1;
  } else if (random > 6) {
    typeIndex = 2;
  }
  List.push(Mock.mock({
    id: '@increment',
    title: '@title(2, 4)', // 优惠券名称
    createdTime: `${Year}-${Month}-@integer(1, 30)`, // 创建时间
    price: '@integer(1, 1000)', // 支付金额
    onePrice: '@integer(1, 100)', // 客单价
    type: type[typeIndex].title, // 类型
    typeIndex: typeIndex,
    content: type[typeIndex].content(), // 优惠内容
    status: Math.random(0, 1).toFixed(2) > 0.5 ? '已结束' : '进行中', // 状态
    use: '@integer(1, 821)', // 已使用
    get: '@integer(1, 3421)', // 已领取
    inNm: '@integer(1, 321321)', // 剩余
  }));
//刮刮乐列表
  luckyCard.push(Mock.mock({
    id: '@increment',
    title: '@title(2, 4)', // 活动名称
    createdTime: `${Year}-${Month}-@integer(1, 30) @integer(1, 12):@integer(1, 59):@integer(1, 59)  至  ${Year}-${Month + 1}-@integer(1, 30)  @integer(1, 12):@integer(1, 59):@integer(1, 59)`, // 创建时间
    number: '每天1次', // 抽奖次数
    users: '@integer(1, 100)', // 抽奖人数
    luckyNumber: '@integer(1, 10)', // 中间人数
    gift: type[typeIndex].giftFun(), // 优惠内容
    status: Math.random(0, 1).toFixed(2) > 0.5 ? '已结束' : '进行中', // 状态
  }))


}

export default [
  {
    url: '/coupon/list',
    type: 'get',
    response: config => {
      const {importance, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/luckyCard/list',
    type: 'get',
    response: config => {
      const {importance, page = 1, limit = 20, sort} = config.query

      let mockList = luckyCard.filter(item => {
        if (importance && item.importance !== +importance) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
]
