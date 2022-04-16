import { getAccessStorage } from '@/utils/accessStorage'
import { message } from 'ant-design-vue'
import axios, { AxiosRequestConfig } from 'axios'
import Config from '@/config'
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
// import { store } from '@/store'
// import { useUserStore } from '@/store/modules/user'
// const userStore = useUserStore(store)

// 设置请求头和请求路径
axios.defaults.baseURL = Config.baseURL
axios.defaults.timeout = Config.requestTimeOut
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 结果返回类型接口定义
// ResType也可以根据后端的通用返回值动态的去修改
export interface ResType {
  code?: number // fix: 响应体数据结构不一样
  success: boolean
  body?: any
  message: string
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = getAccessStorage(Config.tokenName, Config.tokenStorage) || ''
    if (token && config.headers) {
      config.headers.token = token
    }
    return config
  },
  error => {
    console.log(error)
    message.error(error || '网络错误')
    return error
  }
)

// 响应拦截
axios.interceptors.response.use(
  res => {
    const data: any = res.data
    const { code, body, message } = data

    // 一些 respone body 不是 JSON, 比如blob流 单独判断
    // if (response.headers.get('response-type') === 'blob') {
    //   const blob = await response.clone().blob()
    //   return blob
    // }
    if (code === 401) {
      // toast 未登录
      // remove token
      // replace url
      //   userStore.logout(window.location.pathname + window.location.search)
      return Promise.reject(data)
    } else if (code !== 200) {
      return Promise.reject(data)
    }
    return body || message
  },
  error => {
    message.error('网络错误')
    console.log(error)
    // return error
  }
)

interface Http {
  get<T>(url: string, params?: T, config?: AxiosRequestConfig): Promise<any>
  post<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<any>
}

const http: Http = {
  get(url, params, config) {
    return axios.get(url, { params, ...config })
  },
  post(url, data, config) {
    return axios.post(url, JSON.stringify(data), config)
  }
}
export default http
