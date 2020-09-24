import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { setToken,getToken,getCookies,removeToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
 config => {
  //注册token到请求头中。并且判断axios的请求方式，向其中添加token参数
   var xtoken = getToken('Admin-Token')
   if (xtoken!=null) {
     config.headers.Authorization = `${getToken('Admin-Token')}`;
   }
  var urlArray = config.url.split('/');//拆分请求url为数组
  if(urlArray[1]==='api'){//拆分后，第0个/变为空格。第一个才是api
    //在请求参数中添加token
    if(config.method == 'get' ||config.method == 'put' ||config.method == 'delete'||config.method == 'post') {
      config.params = {
        token:xtoken,
        ...config.params
      }
    }
  }/*else if(config.method == 'post') {
    //params会将请求的参数品街道URL中，用于get等请求
     config.data = {
       token:xtoken,
       ...config.params
     }
   }*/
   return config
 },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    /*store.commit('SET_TOKEN', response.data.token)*/
    const res = response.data;
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response) {
        switch (error.response.status) {
          // 返回 401 
          case 401:
            window.location.href=process.env.SSO_URL+process.env.JTYN_URL+getCookies('loginBaseUrl');
          break;  
          // 403请求被禁止
          case 403:
            Message({ 
              message: '登录过期，请重新登录',
              type: 'error',
              duration: 1000
            }) 
            removeToken('Admin-Token')                    
            window.location.href=process.env.SSO_URL+process.env.JTYN_URL+getCookies('loginBaseUrl');              
          break;  
          // 404请求不存在             
          case 404:                
            Message({                        
              message: '网络请求不存在',
              type: 'error',                        
              duration: 1500,                                            
            });                    
          break;
          default:                    
            Message({                        
                message: error.response.data.message,                        
                type: 'error',                        
                duration: 1500,                     
            });
        }
    }
    return Promise.reject(error)
  }
)

export default service
