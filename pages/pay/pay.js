// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr: [],
    address: {},
    allNums: 0,
    allPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { allNums, allPrice, cartArr } = options;
    console.log(options)
    const address = wx.getStorageSync('address');
    if (address) {
      this.setData({
        address,
        allNums,
        allPrice,
        cartArr: JSON.parse(cartArr),
      })
    }
  },
})