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
  {
    id: 3,
    number: 20,
    name: '图标'
  }
]

category.map(res => {
  const url = res.id === 1 ? 'meizhuang' : res.id === 2 ? 'shouji' : 'tubiao'
  for (let i = 0; i < res.number; i++) {
    let type = '.jpg'
    if (res.id === 3) {
      type = '.png'
    }
    List.push(Mock.mock({
      id: '@increment',
      timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(2, 5)',
      importance: '@integer(1, 3)',
      categoryId: res.id,
      coverUrl: 'http://cdn.ifnav.com/evue/' + url + '/' + (i + 1) + type
    }))
  }
})

export default [
  {
    url: '/image/list',
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
    url: '/image/categoryId',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: category
      }
    }
  }
]

