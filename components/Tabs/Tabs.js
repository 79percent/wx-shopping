// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeId: {
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
    handleClick: function(e){
      const { currentTarget } = e;
      const { dataset } = currentTarget;
      const { tabid } = dataset;
      this.triggerEvent('clickTab', {
        tabid
      })
    }
  }
})
