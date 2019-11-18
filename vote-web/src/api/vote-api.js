import request from '@/utils/request';

// 分页查询管理员列表
export function getAdminUserPage(params) {
  return request({
    url:'/admin/getAdminUserPage',
    method:'get',
    params:params
  })
}

// 拉取用户信息
export function getUserInfo(params) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: params
  })
}
// 图片上传
export function uploadImage(data) {
  return request({
    url: '/vote/app/uploadImage',
    method: 'post',
    data: data
  })
}

// 新增管理员
export function addAdminUser(data) {
  return request({
    url: '/admin/addAdminUser',
    method: 'post',
    data: data
  })
}

// 修改管理员
export function updateAdminUser(data) {
  return request({
    url: '/admin/updateAdminUser',
    method: 'post',
    data: data
  })
}

// 管理员修改密码
export function changePassword(data) {
  return request({
    url: '/admin/changePassword',
    method: 'post',
    data: data
  })
}

// 管理员删除
export function delAdminUser(data) {
  return request({
    url: '/admin/delAdminUser',
    method: 'post',
    data: data
  })
}

export function getVoteList(params) {
  return request({
    url:'/vote/queryVotePage',
    method:'get',
    params:params
  })
}

// 删除投票
export function delVote(params) {
  return request({
    url: '/vote/del',
    method: 'delete',
    params: params
  })
}

// 查看详情
export function getVoteDetail(params) {
  return request({
    url: '/vote/getVoteDetail',
    method: 'get',
    params: params
  })
}


// 增加黑/白名单数据
export function addVoteBWList(data) {
  return request({
    url: '/vote/addVoteBWList',
    method: 'post',
    data: data
  })
}
// 删除黑名单地址
export function delBlackUser(params) {
  return request({
    url: '/vote/delBlackUser',
    method: 'get',
    params: params
  })
}
// 删除白名单地址
export function delWhiteUser(params) {
  return request({
    url: '/vote/delWhiteUser',
    method: 'get',
    params: params
  })
}
// 分页展示投票黑名单列表
export function getBlackPage(params) {
  return request({
    url: '/vote/getBlackPage',
    method: 'get',
    params: params
  })
}
// 分页展示投票白名单列表
export function getWhitePage(params) {
  return request({
    url: '/vote/getWhitePage',
    method: 'get',
    params: params
  })
}
