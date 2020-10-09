import request from '@/utils/request'

export function detail(data) {
  return request({
    url: '/feature/detail',
    method: 'get',
    params: data
  })
}
