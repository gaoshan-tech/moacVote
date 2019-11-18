import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Router from '@/router/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_HOST, // api的base_url
  // timeout: 15000 // 请求超时时间
})


// request拦截器
service.interceptors.request.use(config => {
  // console.log('config', config);
  // config.url = config.url + '?t=' + (new Date()).getTime();  // 给每个请求都带上时间戳，解决ie浏览器缓存的问题
  config.headers['Authorization'] = localStorage.token; // 让每个请求携带自定义token 请根据实际情况自行修改
  if(config.data){
    var formdata = new FormData();
    Object.entries(config.data).forEach(([key,value])=>{
      formdata.append(key, value);
    })
    config.data = formdata;
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data;
    if (res.code != '200') {
      // 401:未登录;||res.code == 403
      if (res.code == 'UNAUTHORIZED_') {
        localStorage.clear();
        MessageBox.confirm('您离开的时间过长，请重新登录', '重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // location.reload() // 为了重新实例化vue-router对象 避免bug
          Router.push({path:'/login'})
          // location.href="/login";
        }).catch(() => {
                
        });

      }

      if (res.code == 500) {
         Message({
           message: res.msg,
           type: 'error',
           duration: 3 * 1000
         });
         // return Promise.reject(err);
      }
    } else {
      return res
    }
  },
  error => {
    // Message({
    //   message: error.response.data.message,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    console.log('err' + error)// for debug

    return Promise.reject(error)
  }
)

export default service
