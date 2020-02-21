// components/search_input/search_input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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

    c(){
      let query  = wx.createSelectorQuery();
      console.log(1111)
      console.log(selectAll('#main'));
    }

  },
onload(){
  this.c()
}
})
