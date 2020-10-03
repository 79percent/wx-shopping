import { request } from '../../request/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    isCollected: false,
    previewImages: [],
    footerPaddingBottom: 0,
    product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { model } = wx.getSystemInfoSync();
    if (model.indexOf('iPhone X') > -1) {
      this.setData({
        footerPaddingBottom: 60
      })
    }

    const { goods_id } = options;
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    });
    const { message } = res.data;
    const goods_introduce = message.goods_introduce.replace(/.webp/g, '.jpg');
    const previewImages = message.pics.map(v => v.pics_mid_url);
    this.setData({
      detail: {
        pics: message.pics,
        goods_id: message.goods_id,
        goods_price: message.goods_price,
        goods_name: message.goods_name,
        goods_introduce,
      },
      previewImages,
      product: { ...message },
    })
  },

  // 点击加入购物车
  handleCartAdd: function () {
    const cartArr = wx.getStorageSync("cartArr") || [];
    const { detail, product } = this.data;
    const { goods_id } = detail;
    let isAdd = false;
    cartArr.some(item => {
      if(item.goods_id === goods_id){
        item.num++;
        isAdd = true;
        return true;
      }
      return false;
    })
    if(isAdd === false){
      cartArr.push({
        ...product,
        num: 1,
        checked: true,
      });
    }
    wx.setStorageSync('cartArr', cartArr);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
    });
  },

  // 点击收藏
  handleClickCollected: function () {
    this.setData({
      isCollected: !this.data.isCollected
    })
  },

  // 预览图片
  handlePreview: function (e) {
    const { imgindex } = e.currentTarget.dataset;
    const { previewImages } = this.data;
    wx.previewImage({
      urls: previewImages,
      current: previewImages[imgindex],
    })
  }

})