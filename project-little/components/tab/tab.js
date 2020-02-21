// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
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
    handleItemTap(e){
      //组件点击事件，拿到传过来的当前下标
      const {index}=e.currentTarget.dataset;
      //触发父组件中的自定义事件
      this.triggerEvent("tabsItemChang",{index})
    }
  }
})
