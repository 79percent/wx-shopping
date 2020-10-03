import { stringify } from '../utils/util';

// 请求的次数
let requestNum = 0;

// 请求地址公共部分
export const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';

// 请求方法
export const request = (params = {}) => {
  requestNum++;
  wx.showLoading({
    title: '加载中',
  });
  let { url, method = 'GET', data } = params;
  url = `${baseUrl}${url}`;
  if(method === 'GET' && data){
    url = `${url}?${stringify(data)}`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        requestNum--;
        if(requestNum === 0){
          wx.hideLoading();
        }
      }
    });
  })
}