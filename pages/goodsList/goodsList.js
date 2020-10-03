import { request } from '../../request/index';
import { defalutImage } from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    refresherTriggered: false,
    pagenum: 0,
    total: 0,
    goodsList: [],
    activeId: '0',
    tabsList: [
      {
        id: '0',
        title: '综合'
      },
      {
        id: '1',
        title: '销量'
      },
      {
        id: '2',
        title: '价格'
      },
    ],
    defalutImage,
  },

  queryData: {
    cid: '',
    query: '',
    pagenum: 1,
    pagesize: 20,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const { cid } = options;
    this.queryData.cid = cid;
    this.getGoodsList()
  },

  // 获取商品列表
  getGoodsList: async function () {
    const params = {
      url: '/goods/search',
      data: {
        ...this.queryData,
      }
    };
    const res = await request(params);
    const { message } = res.data;
    const { goods, pagenum, total } = message;
    this.setData({
      goodsList: [...goods],
      pagenum: Number(pagenum),
      total: Number(total),
    })
    return true
  },

  // 点击Tab切换
  handleClickTab: function (e) {
    const { detail } = e;
    const { tabid } = detail;
    this.setData({
      activeId: tabid
    })
  },

  // 滚动到底部时
  handleScrolltolower: async function () {
    const { goodsList, total } = this.data;
    const { pagenum, pagesize } = this.queryData;
    if (pagenum * pagesize >= total) {
      return
    }
    this.queryData.pagenum = pagenum + 1;
    const params = {
      url: '/goods/search',
      data: {
        ...this.queryData,
      }
    };
    const res = await request(params);
    const { message } = res.data;
    const { goods: newGoods, pagenum: newPagenum, total: newTotal } = message;
    this.setData({
      goodsList: [...goodsList, ...newGoods],
      pagenum: Number(newPagenum),
      total: Number(newTotal),
    })
  },

  // 自定义下拉刷新被触发
  handlerefresherrefresh: function () {
    this.setData({
      refresherTriggered: true,
    }, () => {
      this.queryData.pagenum = 1;
      this.getGoodsList()
        .then(res => {
          this.setData({
            refresherTriggered: false
          })
        })
    })
  },

});