import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import storage from './storage'

console.log(import.meta.env) //读取配置文件变量
console.log('config', env) //读取配置文件变量

//创建实例对象
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: '565AC03DAE9FEB57',
  },
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    //是否使用mock地址进行测试
    config.baseURL = env.mock ? env.mockApi : env.baseApi

    return {
      ...config,
    }
  },
  (error: AxiosError) => {
    //错误处理
    return Promise.reject(error)
  }
)
//相应拦截
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (data.code === 500001) {
      //没有登陆
      //1. 提示错误信息
      message.error(data.msg)
      //2. 删除已有的token
      storage.remove('token')
      //3. 从定向到登录
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      //报错
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.msg)
    return Promise.reject(error.message)
  }
  //1.
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params: object): Promise<T> {
    return instance.post(url, params)
  },
}
