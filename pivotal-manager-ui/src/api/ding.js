import request from '@/utils/request'

/** 获取钉钉通知列表*/
export function getList(data) {
  return request({
    url: '/ding',
    method: 'get',
    params: data
  })
}
