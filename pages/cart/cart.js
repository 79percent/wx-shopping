import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx';
import { defalutImage } from '../../utils/util';

Page({
  data: {
    address: {},
    showAddress: false,
    cartArr: [],
    isAllChecked: false,
    allPrice: 0,
    allNums: 0,
    defalutImage,
  },

  onShow: function (options) {
    const address = wx.getStorageSync('address');
    if (address) {
      this.setData({
        address,
        showAddress: true,
      })
    } else {
      this.setData({
        address,
        showAddress: false,
      })
    }
    const cartArr = wx.getStorageSync('cartArr');
    if (cartArr) {
      this.saveData(cartArr);
    }
  },

  // 保存数据
  saveData: function (cartArr) {
    const { allPrice, allNums, isAllChecked } = this.calcFooterData(cartArr);
    this.setData({
      cartArr,
      allPrice,
      allNums,
      isAllChecked,
    });
  },

  // 计算底部数据
  calcFooterData: function (cartArr) {
    let isAllChecked = false;
    let checedNums = 0;
    let allPrice = 0;
    let allNums = 0;
    cartArr.forEach(item => {
      const { goods_price, checked, num } = item;
      if (checked) {
        allPrice += goods_price * num;
        allNums += num;
        checedNums++;
      }
    })
    if (checedNums === cartArr.length) {
      isAllChecked = true;
    }
    return {
      allPrice,
      allNums,
      isAllChecked,
    };
  },

  // 点击数量- +
  handleClickBtn: function (e) {
    const { dataset } = e.currentTarget;
    const { index, type } = dataset;
    const { cartArr } = this.data;
    let { num } = cartArr[index];
    if (type === 'minus') {
      if (num <= 1) {
        wx.showToast({
          title: '最小为1',
          icon: 'none',
        })
      } else {
        num--;
      }
    } else if (type === 'add') {
      num++;
    }
    cartArr[index].num = num;
    this.saveData(cartArr);
    wx.setStorageSync("cartArr", cartArr);
  },

  // 点击地址
  handleClickAddress: async function () {
    try {
      const address = await chooseAddress();
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },

  // 点击选择收货地址按钮
  handleChooseAdress: async function () {
    try {
      const result = await getSetting();
      const { authSetting } = result;
      if (authSetting['scope.address'] === false) {
        await openSetting();
      } else {
        const address = await chooseAddress();
        wx.setStorageSync("address", address);
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 点击单选框
  handleClickCheckBox: function (e) {
    const { dataset } = e.currentTarget;
    const { currentindex } = dataset;
    const { cartArr } = this.data;
    const newChecked = !cartArr[currentindex].checked
    cartArr[currentindex].checked = newChecked;
    this.saveData(cartArr);
    wx.setStorageSync("cartArr", cartArr);
  },

  // 点击全选
  handleClickCheckAll: function (e) {
    const { cartArr, isAllChecked: current } = this.data;
    let checked;
    if (current) {
      checked = false;
    } else {
      checked = true;
    }
    cartArr.forEach(item => {
      item.checked = checked;
    });
    this.saveData(cartArr);
    wx.setStorageSync("cartArr", cartArr);
  },

  // 点击结算
  handleClickPay: function () {
    const { cartArr, showAddress, allNums, allPrice } = this.data;
    if (!showAddress) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
      })
      return
    }
    if (cartArr.length === 0) {
      wx.showToast({
        title: '请添加购物商品',
        icon: 'none',
      })
      return
    }
    const isSomeChecked = allNums === 0;
    if (isSomeChecked) {
      wx.showToast({
        title: '请选择购物商品',
        icon: 'none',
      })
      return
    }
    const carts = cartArr.filter(v => v.checked).map(item => {
      const { goods_id, goods_name, goods_price, num, goods_small_logo = defalutImage } = item;
      return {
        goods_id,
        goods_name,
        goods_price,
        num,
        goods_small_logo,
      }
    })
    wx.navigateTo({
      url: `/pages/pay/pay?allNums=${allNums}&allPrice=${allPrice}&cartArr=${JSON.stringify(carts)}`,
    });
  }
})