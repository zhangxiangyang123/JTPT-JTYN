import request from '../../utils/request'

//数据量
export function getDataCenterInfo(date) {
  return request({
    url: '/api/datacenter/getDataCenterInfo/' + date,
    method: 'get'
  })
}