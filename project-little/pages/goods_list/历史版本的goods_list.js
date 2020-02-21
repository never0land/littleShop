// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //标题点击事件，从子组件传递过来
  handleTabsItemChange(e){
    //获取点击的下标，注意，这个东西是在父组件获取的，不是在子组件
    const {index} =e.detail;
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //定义并且解构tabs的内容，并且赋值给当前的data，
    //并且tabs进行foreach遍历，箭头函数拥有两个值，一个是value值，另一个是value对应的index，当e的detail全等于index的时候，把isactive的值变为真，同时触发点击效果
    this.setData({
      tabs
    })
  }

 

})