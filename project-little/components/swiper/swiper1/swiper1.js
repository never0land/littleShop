import { request } from "../../../request/index.js";
// pages/indexs/indexs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_data: {
      index_swiper: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_index_swiper()
  },
  get_index_swiper() {
    request({
      url: 'https://www.fastmock.site/mock/0c709a8911061c90e026f9c29066b405/ConventionalLittle/index/swiper'
    }).then(result => {
      console.log(result);
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