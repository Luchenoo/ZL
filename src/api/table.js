import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://10.6.3.76:8079/person/getPersonList',
    method: 'post',
    params
  })
}
export function getShebei(params) {
  return request({
    url: 'http://10.6.3.76:8079/identify/getIdentifyData',
    method: 'post',
    params
  })
}
