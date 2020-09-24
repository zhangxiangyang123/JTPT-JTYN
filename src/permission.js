import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { setToken, getToken, setCookies, getCookies } from '@/utils/auth' // 验权
import { getQueryString } from '@/utils/index' //获取url参数方法
import { getTokenApi } from '@/api/login'
const whiteList = ['/login'] // 不重定向白名单
const Appid = store.state.user.appid;//系统ID
router.beforeEach((to, from, next) => {
  setCookies('loginBaseUrl', to.path);
  NProgress.start()
  if (getToken('Admin-Token')) {
    console.log(getToken('Admin-Token'))
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      if (getToken('Admin-Token').length === 0) {
        // 拉取用户信息
        store.dispatch('GetInfo').then(res => {
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      /*next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页*/
      getCookies('loginBaseUrl');
      var paths = process.env.JTYN_URL + getCookies('loginBaseUrl');
      if (!getQueryString('ticket')) {
        getTokenApi().then(response => {

        }).catch(error => {
        })
      } else {
        getTokenApi(getQueryString('ticket'), paths, Appid).then((result) => {
          var token = result.token
          setToken(result.token);
          window.location.reload()
        }, function (err) {
        }).catch(function (error) {
          Message({
            message: '正在前往登录页面',
            type: 'error',
            duration: 5000
          })
        })
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
