import request from '@/utils/request'

export function customerList(query) {
  return request({
    url: '/customer/list',
    method: 'get',
    params: query
  })
}

export function customerTagList(query) {
  return request({
    url: '/customer/tag',
    method: 'get',
    params: query
  })
}
