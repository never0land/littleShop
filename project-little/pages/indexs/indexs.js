import { request } from "../../request/index.js";
// pages/indexs/indexs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      index_swiper:[],
      index_icons:[],
      floors:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
this.get_index_swiper(),
this.get_index_icons(),
this.get_index_floor()
  },
  get_index_swiper(){
    request({
      url: '/index/swipers'
    }).then(result=>{
      console.log(result);
      console.log(1111111111111)
      this.setData({
      index_swiper:result.data.data
      })
    })
  },
  get_index_icons(){
    request({
      url: '/index/icons'
    }).then(result => {
      console.log(result);
      console.log(11111111111111111111)
      this.setData({
        index_icons: result.data.data
      })
    })
  },
  get_index_floor(){
    request({
      url: '/index/floors'
    }).then(result => {
  
      //console.log(result.data.data.fl1.fl_data.fl_top_data)
      this.setData({
        floors:result.data.data.data
        })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})