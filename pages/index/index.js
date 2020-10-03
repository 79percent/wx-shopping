import { request } from '../../request/index';

Page({
  data: {
    swiperList: [],
    cateList: [],
    flootList: [],
  },

  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图
  getSwiperList: async function () {
    const params = {
      url: '/home/swiperdata',
    };
    const res = await request(params);
    const { message } = res.data;
    this.setData({
      swiperList: [...message],
    })
  },

  // 获取导航菜单
  getCateList: async function () {
    const params = {
      url: '/home/catitems',
    };
    const res = await request(params);
    const { message } = res.data;
    this.setData({
      cateList: [...message],
    })
  },

  // 获取楼层数据
  getFloorList: async function () {
    const params = {
      url: '/home/floordata'
    };
    const res = await request(params);
    const { message } = res.data;
    this.setData({
      flootList: [...message],
    })
  },
});