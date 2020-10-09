import Mock from 'mockjs'

const List = []
const category = [
  {
    id: 1,
    number: 8,
    name: '美妆'
  },
  {
    id: 2,
    number: 6,
    name: '手机'
  },
]
const Year = new Date().getFullYear()
const Month = new Date().getMonth() + 1
for (var i = 0; i < 10; i++) {
  category.map(res => {
    const url = res.id === 1 ? 'meizhuang' : 'shouji'
    for (let i = 0; i < res.number; i++) {
      let type = '.jpg';
      if (res.id === 3) {
        type = '.png'
      }
      List.push(Mock.mock({
        id: '@increment',
        title: '@title(2, 4)', // 商品名称
        createdTime: `${Year}-${Month}-@integer(1, 30)`, // 创建时间
        price: '@integer(1, 1000)', // 价格
        totalStock: '@integer(1, 1000)', // 库存
        visitCountPv: '@integer(1, 821)', // 访客数
        visitCountUv: '@integer(1, 3421)', // 浏览量
        totalSoldNum: '@integer(1, 321321)', // 总销量
        imageUrl: 'http://wangzheshike.xxgushi.com/admin/' + url + '/' + (i + 1) + type, // 商品主图
        categoryId: res.id
      }))
    }
  })
}

export default [
  {
    url: '/goods/list',
    type: 'get',
    response: config => {
      const {importance, categoryId, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (categoryId && item.categoryId !== +categoryId) return false
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
    url: '/goods/categoryId',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: category
      }
    }
  }
]
