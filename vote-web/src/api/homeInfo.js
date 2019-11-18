import request from '@/utils/request';

export function getHomeInfo(data) {
  return request({
    url: '/admin/homePage/getHomePageInfo',
    method: 'post',
    data: data
  })
}
