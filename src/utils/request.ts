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
  /**headers: {
    icode: '235F6F12641DDA02',
  },**/
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
    //config.baseURL = env.mock ? env.mockApi : env.baseApi

    return {
      ...config,
    }
  },
  (error: AxiosError) => {
    //错误处理
    return Promise.reject(error)
  }
)*
//相应拦截
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if(data.status != 200) {
      message.error(data.msg)
      return Promise.reject(data)
    }
   /** if (response.config.responseType === 'blob') return response
      if (data.status === 500001) {
        //没有登陆
        //1. 提示错误信息
        message.error(data.msg)
        //2. 删除已有的token
        storage.remove('token')
        //3. 从定向到登录
        location.href = '/login?callback=' + encodeURIComponent(location.href)
      } else if (data.status != 200) {
        //报错
       
      } **/

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
  put<T>(url: string, params: object): Promise<T> {
    return instance.put(url, params)
  },
  delete<T>(url: string): Promise<T> {
    return instance.delete(url)
  },

  downloadFile(id: string) {
      axios.get(
        `http://127.0.0.1:8080/cabinet/exportExcelById?id=`+id,
        {
          responseType: 'blob'
        }
      )
      .then((res) => {
        try {
          console.log('响应信息 =>', res)
 
          if (res.data.size > 0) {
            // 响应头信息
            const headers = res.headers
            // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8
            const contentType = headers['content-type']
            console.log('contentType =>', contentType)
            
            const url = window.URL.createObjectURL(
              new Blob(
                [res.data],
                {
                  type: contentType
                }
              )
            )
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', `订单列表.xlsx` || 'template.xlsx')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } else {
          
          }
        } catch (e) {
          console.error(e)
          
        }
      })
      .catch((e) => { 
        console.error(e)
        
      })
    },
 
}
