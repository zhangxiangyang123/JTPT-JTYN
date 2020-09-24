import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
//设置cookie，获得cookie  --吕振兴
export function setCookies(baseNmae,cookies) {
  return Cookies.set(baseNmae,cookies)
}
export function getCookies(baseNmae) {
  return Cookies.get(baseNmae)
}
