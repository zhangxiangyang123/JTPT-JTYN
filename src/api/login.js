import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
//退出登录 ---吕振兴 
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
//获得token ---吕振兴 
export function getTokenApi(ticket,paths,appid) {
  return request({
    url: `http://10.70.3.204:8080/api/cas/Permission/${appid}?ticket=${ticket}&servicePath=${paths}`,
    method: 'get',
  })
}