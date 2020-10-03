/**
 * 获取当前用户权限设置信息
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (error)=>{
        reject(error);
      }
    });
  })
}

/**
 * 打开用户权限设置页面
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (error)=>{
        reject(error);
      }
    });
  })
}

/**
 * 打开微信选择通讯地址页面
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result);
      },
      fail: (error)=>{
        reject(error);
      }
    });
  })
}