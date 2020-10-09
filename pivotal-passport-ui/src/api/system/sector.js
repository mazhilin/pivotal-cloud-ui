import request from '@/utils/request'

export function sectorList(query) {
  return request({
    url: '/system/sector/list',
    method: 'get',
    params: query
  })
}
