import request from '~/http'

export function login(data) {
  return request({
    url: '/user/signIn',
    method: 'POST',
    data,
  })
}
