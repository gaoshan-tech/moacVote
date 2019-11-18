import request from '@/utils/request';
// 更新banner或者咨询列表
export function updatePassword(params) {
  return request({
    url: '/admin/admin/updatePassword',
    method: 'post',
    data: params
  })
}
