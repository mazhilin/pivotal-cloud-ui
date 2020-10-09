import request from '@/utils/request'

export function getRouters(data) {
  return request({
    url: '/routes',
    method: 'get',
    params: data
  })
}
