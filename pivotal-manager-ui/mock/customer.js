import Mock from 'mockjs'

const List = []
const accountType = [
  {
    id: 1,
    number: 8
  },
  {
    id: 2,
    number: 6
  }
]
const Year = new Date().getFullYear()
const Month = new Date().getMonth() + 1
for (var i = 0; i < 10; i++) {
  accountType.map(res => {
    const url = res.id === 1 ? 'meizhuang' : 'shouji'
    for (let i = 0; i < res.number; i++) {
      let type = '.jpg'
      if (res.id === 3) {
        type = '.png'
      }
      List.push(Mock.mock({
        id: '@increment',
        name: '@title(1, 3)', // 姓名
        mobile: /^1[385][1-9]\d{8}/, // 手机号码
        fansPicture: 'http://cdn.ifnav.com/evue/' + url + '/' + (i + 1) + type, // 商品主图
        createdAt: +Mock.Random.date('T'), // 加入时间
        tradeCount: '@integer(0, 1000)', // 累计消费金额
        buyCount: '@integer(1, 10)', // 购买次数
        storedBalance: '@integer(1, 1000)', // 余额
        lastTradeTime: `${Year}-${Month}-@integer(1, 30)-@integer(10, 59)`, // 上次消费时间,
        points: '@integer(1, 1000)', // 积分
        card: [], // 权益卡
        accountType: res.id // 客户类型
      }))
    }
  })
}

// 标签列表
const tagList = []
for (let i = 0; i < 50; i++) {
  const mockData = {
    createdAt: 1569246862,
    customerNum: '@integer(0, 100000)', // 客户数量
    fansNum: '@integer(0, 100000)', // 粉丝数量
    id: '@increment',
    isAddTagDone: false,
    isAutoTag: (i / 3 === 1), // 是否为自动标签
    kdtId: 44049420,
    name: '@title(1, 3)', // 标签名字
    updatedAt: 0
  }
  if (mockData.isAutoTag) { // 自动标签
    mockData.rule = {
      buyTimeStart: `${Year}-${Month}-@integer(1, 10)-@integer(10, 59)`,
      buyTimeEnd: `${Year}-${Month}-@integer(10, 30)-@integer(10, 59)`,
      logic2And: false
    }
  }
  tagList.push(Mock.mock(mockData))
}

export default [
  {
    url: '/customer/list',
    type: 'get',
    response: config => {
      const {importance, accountType, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (accountType && item.accountType !== +accountType) return false
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
  // 标签列表
  {
    url: '/customer/tag',
    type: 'get',
    response: config => {
      const {page = 1, limit = 20, sort} = config.query

      let mockList = tagList.filter(item => {
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
  }
]
