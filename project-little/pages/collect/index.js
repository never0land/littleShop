// pages/collect/index.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
        id:1,
        value:"店铺收藏",
        isActive:false
      },
      {
        id:2,
        value:"攻略收藏",
        isActive:false
      },
      {
        id:3,
        value:"足迹",
        isActive:false
      }
    ],
   collect:[],
   foot:[]
  },
  handleTabsItemChange(e){
      //1获取被点击的标题索引
      const {index} = e.detail;
this.changeTitleByIndex(index)

  },
changeTitleByIndex(index){
      //修改原数组
      let {tabs} = this.data
      tabs.forEach((v,i) => i === index?v.isActive=true:v.isActive= false
      );
      //赋值到data中
      this.setData({
        tabs
      })
},


  onShow(){
    // const user = wx.getStorageSync("userInfo")
    // if(!user.nickName){
    //   wx.navigateBack({
    //     delta: 1
    //   });
    //   wx.showToast({
    //     title: '请先登录',
    //     duration: 1500,
    //     mask: true,
    //   });
        
    //   return;
    // }
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    this.changeTitleByIndex(type-1);
    const collect=wx.getStorageSync("collect")||[];
    let currentPages =  getCurrentPages()||[];
    console.log(currentPages);
    let foot = currentPages.map(v=>v.route);
    console.log(foot)
      
    this.setData({
      collect,
      foot
    })
  }
})