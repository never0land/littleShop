// pages/category/index.js
import { request } from "../../request/index.js";
//import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],//左边数据
    rightContent:[],//右边
    currentIndex:0,
    scrolltop:0
  },
  Cates:[],//
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates =wx.getStorageSync("cates");
        //读取本地缓存
    if(!Cates){
      this.get_category();
      console.log("本地缓存过时或者首次打开页面，发送请求");
    }else{
     if(Date.now()-Cates.time>1000*120){
       //两分钟以内，缓存不过时,过期后重新发送请求
       this.get_category();
     }else{
      this.Cates = Cates.date;
      //否则总表数组等于缓存名字是cates的date
      let leftMenuList = this.Cates.map(v=>v.name);
      let rightContent = this.Cates[0];
      this.setData({
        leftMenuList,
        rightContent,
        Cates:this.Cates
      })
     }
    }
  },
get_category(){
  request({
    url: '/category'
  }).then(result => {

      this.Cates = result.data.data.data;
      //接口数据本地缓存化
      wx.setStorageSync("cates",{time:Date.now(),date:this.Cates})
      let leftMenuList = this.Cates.map(v=>v.name);
      //左边标题全部拿到
      let rightContent = this.Cates[0];
      this.setData({
        leftMenuList,
        rightContent,
        Cates:this.Cates
      })
  })
},
handleItemTap(e){
  const {index}=e.currentTarget.dataset;
  let rightContent = this.Cates[index];
  this.setData({
    rightContent,
    currentIndex:index,
    scrolltop:0
  })
}
})