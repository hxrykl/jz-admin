import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // 当withCredentials: true, 当跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token'] 自定义标题键
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error)
    // 抛出承诺失败
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const data = response.data // 响应信息
    response.status = data.status // 响应整体状态
    response.statusText = data.message // 响应就绪状态
    response.data = data.data // 响应数据
    // 如果状态不是ok
    if (data.status !== 200) {
      Message({
        message: data.message,
        type: 'error'
      })
      // 返回承诺失败
      return Promise.reject(new Error(data.message || 'Error'))
    } else {
      // 否则返回响应信息
      return response
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export function get (url, params) {
  return service.get(url,{
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

// 自定义post
export function post(url, data) {
  // qs.stringify(data)将对象 序列化成URL的形式，以&进行拼接
  return service.post(url, qs.stringify(data),
    {
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
*/
export function post_array(url, data) {
  return service.post(url, qs.stringify(data, { arrayFormat: 'repeat' }),
    {
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
}
// 暴露一个service
export default service
