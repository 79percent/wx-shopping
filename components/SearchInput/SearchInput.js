// components/SearchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    acitveId: {
      type: String || Number,
      value: ''
    },
    tabsList: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      console.log(e)
    }
  }
})
