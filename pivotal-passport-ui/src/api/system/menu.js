import request from '@/utils/request'

export function getMenuList(query) {
  return request({
    url: '/system/menu/menu',
    method: 'get',
    params: query
  })
}
