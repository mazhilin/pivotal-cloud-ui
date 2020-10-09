import request from '@/utils/request'

export function goodsList(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
  })
}

export function categoryList(query) {
  return request({
    url: '/goods/categoryId',
    method: 'get',
    params: query
  })
}
