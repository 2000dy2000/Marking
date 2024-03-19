import request from '~/http'
import type { question } from '~/types/savequestion'

export function savequestion(data) {
  return request({
    url: '/savequestion/saveQuestions',
    method: 'POST',
    data,
  })
}
export function getAllQuestion(userid) {
  return request({
    url: '/savetext/get',
    method: 'GET',
    params: {
      userid: userid
    }
  })
}
