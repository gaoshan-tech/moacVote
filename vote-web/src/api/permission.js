import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/admin/permission/treeList',
        // url:'/admin/permission/list',
        method:'get',
        params:params
    })
}

export function editOne(id) {
    return request({
        url:'/role/update/'+id,
        method:'get',
    })
}
export function saveaddinfo(data) {
    return request({
      url:'/admin/permission/create',
      method:'post',
      data:data
    })
}

export function productcancel(params) {
    return request({
      url:'/homeProduct/daily/productcancel',
      method:'post',
      params:params
    })
}

export function productdelete(params) {
    return request({
      url:'/homeProduct/daily/productdelete',
      method:'post',
      params:params
    })
}

export function saveupdate(id,data) {
    return request({
      url:'/admin/permission/update/'+id,
      method:'post',
      data:data
    })
}

export function deleteItem(id) {
  return request({
    url:'/admin/permission/delete?ids='+id,
    method:'post',
  })
}


