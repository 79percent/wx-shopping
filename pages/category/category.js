import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightContentList: [],
    leftMenuList: [],
    activeIndex: 0,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates');
    if(!cates || (Date.now() - cates.time > 1000 * 60 * 5)){
      this.getCateList();
    }else{
      const {leftMenuList, rightContentList} = cates;
      this.setData({
        leftMenuList,
        rightContentList,
        activeIndex: 0,
      })
    }
  },

  // 获取分类列表
  getCateList: async function () {
    const params = {
      url: '/categories'
    };
    const res = await request(params);
    const { message } = res.data;
    const rightContentList = [];
    const leftMenuList = message.map(item => {
      const { children, ...menuItem } = item;
      rightContentList.push([...children]);
      return {
        ...menuItem
      }
    });
    wx.setStorageSync("cates", {
      time: Date.now(),
      leftMenuList,
      rightContentList,
    })
    this.setData({
      leftMenuList,
      rightContentList,
    })
  },

  // 点击目录
  handleClickMenuItem: function (e) {
    const { dataset } = e.currentTarget;
    const { activeIndex } = this.data;
    if(activeIndex === dataset.activeindex){
      return 
    }
    this.setData({
      activeIndex: dataset.activeindex,
      scrollTop: 0,
    })
  },
})