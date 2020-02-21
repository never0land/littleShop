
import {request} from "../../request/index.js"
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退换货",
        isActive:false
      }
    ],
   orders:[]
  },
  onShow(){
    /*
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
          //因为没有实际交易，所以肯定没有token的,但实际来说查询订单这些私人动作是必须带验证的，加token是必须的
    */
    //options只在onload拿到
    //1:页面栈概念，在小程序里，页面栈只能容纳十个页面，可以考虑了为一个数组，特别应用于倒退页面的场景，基本上先入先释放
  let pages =  getCurrentPages();
  //在页面栈里，数组中，索引最大的页面就是当前页面，而这个方式是可以拿到当前页面的options的
    let currentPage = pages[pages.length-1];
    

    //获取url上的type
    const {type} = currentPage.options;
    //动态变化页面标题
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  getOrders(type){
    const res = request({url:"/main/order",data:{type}}).then(result=>{
      this.setData({
        orders:result.data.data.map(
          v=>(
            {...v,
              create_time_cn:(
                new Date(v.create_time*1000).toLocaleString()
                //首先要清楚一点，v.create_time这个世间戳是秒还是毫秒为单位，然后new一个时间对象，再转本地格式出来
                )
              }
              )
              )
        //把循环项展开，原样返回
      })
      console.log(result)
    })
  },
  changeTitleByIndex(index){
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e){
    //获取点击的下标，注意，这个东西是在父组件获取的，不是在子组件
    const {index} =e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1)
    //当标题发生变化，重新发起请求，更换数据
  }

})