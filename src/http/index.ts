import { reject } from 'lodash-es'
import type { ApiResult } from '~/modules/entity/apiresult'
import { toPage } from '~/utils/navigationUtils'

interface Options {
  url: string
  baseUrlOption?: 'qycBaseUrl' | 'spiderBaseUrl'
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  header?: any
  data?: any
  params?: any
  filePath?: string
  name?: string
  cancelAllTask?: boolean
  success?: (res: any) => void
  fail?: (err: any) => void
  complete?: () => void
}

const taskQueue: any[] = []

function service<T = any>(options: Options): Promise<ApiResult<T>> {
  // 设置默认值
  options.baseUrlOption = options.baseUrlOption || 'qycBaseUrl'
  options.method = options.method || 'GET'
  options.header = options.header || {}
  options.data = options.data || {}
  options.params = options.params || {}
  options.filePath = options.filePath || ''
  options.name = options.name || ''

  // const REQ_PATH = options.url

  // const VITE_API_QYC_BASEURL = import.meta.env.VITE_API_QYC_BASEURL
  // const VITE_API_SPIDER_BASEURL = import.meta.env.VITE_API_SPIDER_BASEURL
  const VITE_API_BASEURL = import.meta.env.VITE_API_BASEURL

  // 设置BASE_URL
  // if (options.baseUrlOption === 'qycBaseUrl') {
  //   options.url = `${VITE_API_QYC_BASEURL}${options.url}`
  // }
  // else if (options.baseUrlOption === 'spiderBaseUrl') {
  //   options.url = `${VITE_API_SPIDER_BASEURL}${options.url}`
  //   options.header = {
  //     ...options.header,
  //     timeout: 60_000 * 5, // 爬虫任务，增加一些超时时间
  //   }
  // }
  options.url = `${VITE_API_BASEURL}${options.url}`

  // 封装GET请求参数
  if (options.method === 'GET' && options.params) {
    const paramsArray: string[] = []
    Object.keys(options.params).forEach(key =>
      paramsArray.push(`${key}=${options.params[key]}`),
    )
    if (options.url.search(/\?/) === -1)
      options.url += `?${paramsArray.join('&')}`
    else options.url += `&${paramsArray.join('&')}`
  }

  // 判断本地是否存在token，如果存在则带上请求头
  const { tokenInfo } = storeToRefs(useAppStoreWidthOut())
  const { removeToken, removeCurrUserInfo } = useAppStoreWidthOut()
  // TODO: 检测TOKEN是否过期

  if (tokenInfo.value.token) {
    options.header = {
      ...options.header,
      'content-type': 'application/json',
      'Authorization': `${tokenInfo.value.token}`,
    }
  }

  // 按需取消目前在队列中的所有请求
  if (options.cancelAllTask) {
    taskQueue.forEach((task) => {
      task.request.abort()
    })
    taskQueue.length = 0
  }

  const handleError = (cb, rejectData) => {
    cb()
    reject(rejectData)
  }

  return new Promise((resolve, reject) => {
    options.success = (res) => {
      // FIXME:
      // 由于后端返回的数据格式不统一，这里做一层兼容处理，后续后端统一返回格式后，这里要重新处理
      // 特殊处理获取验证码请求
      if (res.data.code === 200) {
        resolve(res.data)
        return
      }

      if (res.data.code !== undefined) {
        // switch (res.data.code) {
        //   // 登录失效
        //   case 401:
        //     handleError(() => {
        //       // 清除本地token和用户信息
        //       removeToken()
        //       removeCurrUserInfo()
        //       uni.showModal({
        //         title: '提示',
        //         content: '登陆失效，请重新登陆',
        //         showCancel: false,
        //         success: () => {
        //           toPage('login')
        //         },
        //       })
        //     }, res.data)
        //     break
        //
        //     // 没有权限访问
        //   case 403:
        //     handleError(() => {
        //       uni.showToast({
        //         icon: 'none',
        //         duration: 3000,
        //         title: '您没有权限访问该界面',
        //       })
        //     }, res.data)
        //     break
        //
        //     // 访问地址不存在
        //   case 404:
        //     handleError(() => {
        //       uni.showToast({
        //         icon: 'none',
        //         duration: 3000,
        //         title: '访问路径不存在',
        //       })
        //     }, res.data)
        //     break
        //
        //   case 555:
        //     handleError(() => {
        //       console.log('555')
        //     }, res.data)
        //     break
        //
        //   default:
        //     handleError(() => {
        //       console.log('default')
        //       uni.showToast({
        //         icon: 'none',
        //         duration: 3000,
        //         title: `${res.data.msg || '未知错误'}`,
        //       })
        //     }, res.data)
        //     break
        // }
      }
      else {
        resolve(res.data)
      }
    }

    options.fail = (err) => {
      if (err.errMsg.includes('abort'))
        return
      // 请求失败弹窗
      uni.showToast({
        icon: 'none',
        duration: 3000,
        title: '服务器错误,请稍后再试',
      })
      reject(err)
    }

    options.complete = () => {
      // 请求完成后，将当前请求从队列中移除
      const index = taskQueue.findIndex(task => task.name === options.url)
      if (index !== -1)
        taskQueue.splice(index, 1)
    }

    if (options.filePath !== '' && options.name !== '')
      uni.uploadFile(options)
    else taskQueue.push({ request: uni.request(options), name: options.url })
  })
}

export default service
