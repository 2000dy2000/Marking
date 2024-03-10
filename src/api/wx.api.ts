import request from '~/http'

export const getWeixinPhone = (data) => {
  return request<{
    code: string
  }>({
    url: '/ums/user/loginByWechatPhone',
    method: 'POST',
    data,
  })
}

// 微信登录请求
export function loginByWeChat(code) {
  return request({
    url: `/ums/user/loginByWechat/${code}`,
    method: 'POST',
  })
}

// 绑定微信号
export function bindWechat(data: {
  openid: string
}) {
  return request({
    url: '/wx/bind',
    method: 'POST',
    data,
  })
}
