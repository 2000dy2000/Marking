import request from '~/http'
import type { UserRes } from '~/types/user'

// WMS-验证码获取
export function getWmsCode() {
  return request({
    url: '/captchaImage',
    method: 'GET',
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/getInfo',
    method: 'GET',
  })
}

export function getAllUser() {
  return request({
    url: '/system/user/list',
    method: 'GET',
  })
}

export function SearchUserList(params) {
  return request({
    url: '/system/user/list',
    method: 'GET',
    params,
  })
}

export function updateUser(data: Partial<UserRes>) {
  return request({
    url: '/system/user',
    method: 'PUT',
    data,
  })
}
