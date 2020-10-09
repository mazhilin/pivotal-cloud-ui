import request from '@/utils/request'

export function couponList(query) {
  return request({
    url: '/coupon/list',
    method: 'get',
    params: query
  })
}

export function luckyCardList(query) {
  return request({
    url: '/luckyCard/list',
    method: 'get',
    params: query
  })
}
