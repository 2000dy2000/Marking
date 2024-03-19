import request from '~/http'
import type { question } from '~/types/savequestion'

export function savequestion(data) {
  return request({
    url: '/labelquestion/labelQuestions',
    method: 'POST',
    data,
  })
}
export function getAllQuestion(userid) {
  return request({
    url: '/labeltext/get',
    method: 'GET',
    params: {
      userid: userid
    }
  })
}

