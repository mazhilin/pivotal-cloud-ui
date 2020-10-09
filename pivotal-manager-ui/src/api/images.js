import request from '@/utils/request'

export function imageList(query) {
  return request({
    url: '/image/list',
    method: 'get',
    params: query
  })
}

export function categoryList(query) {
  return request({
    url: '/image/categoryId',
    method: 'get',
    params: query
  })
}

