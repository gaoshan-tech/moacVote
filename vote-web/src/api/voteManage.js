import request from '@/utils/request'
export function getVoteList(params) {
  return request({
    url:'/vote/queryVotePage',
    method:'get',
    params:params
  })
}
