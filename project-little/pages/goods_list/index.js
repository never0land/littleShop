// pages/goods_list/goods_list.js
import {request} from "../../request/index.js";
//import regeneratorRuntime from '../../lib/runtime/runtime';
/*
触底事件
1：找到滚动条触底事件
2：判断还有没有下一页数据，
pagenum:是关键字，代表当前页数
总页数=总条数/页面容量（一页有多少条数据）
假如可以获取到数据的总页数
假如可以获取到当前页码
##################################################
判断当夜页码是否大于等于总页数
3：假如没有下一页数据，弹框提示
4：如果有，那么继续加载下一页
*/
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
    ],
    goodsList:[]
  },
  queryparams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalpage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options可以获取上一个页面传过来的数据
    this.queryparams.cid=options.cid;
    this.getgoodslist();
  },
  //获取商品列表数据
  getgoodslist(){
    request({ url: '/goods_list',data:this.queryparams}).then(result=>{
      console.log(result)
      this.goodsList=result.data.data.data;
    //  const total =result.data.data.data.total;
       //因为没后端，所以只能前端模拟后端。总表goods_list首先拿到全部值，同时获得total总数据条数
     // this.totalpage = Math.ceil(total/this.queryparams.pagesize);
     this.setData({
       goodsList:result.data.data
     })
      // const total =res.data.data;
      //this.totalpage = Math.ceil(total/this.queryparams.pagesize);
      //console.log(total)
    })
    wx.stopPullDownRefresh();
  },
  //  async getgoodslist(){
  //   const res = await request({
  //     url:"/goods/list",data:this.queryparams
  //   });
  //   //获取总共有多少条数据
  //   const total =res.total;
  //   this.totalpage=Math.ceil(total/this.queryparams.pagesize);
  //   console.log(res);
  //   console.log("没验证的es7请求结果，回去再合并")
  //  this.setData({
  //    goodsList:res.goods
  //  })
  // },
  //标题点击事件，从子组件传递过来
  handleTabsItemChange(e){
    //获取点击的下标，注意，这个东西是在父组件获取的，不是在子组件
    const {index} =e.detail;
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    /*let objectArraySort = function (keyName) {
     return function (objectN, objectM) {
      let valueN = objectN[keyName]
      let valueM = objectM[keyName]
      if (valueN < valueM) return 1
      else if (valueN > valueM) return -1
      else return 0
     }
    }
    console.log(this.goodsList.sort(objectArraySort('Sales_volume')))
    这种排列有问题，首字母排列很容易会死人
*/
    //定义并且解构tabs的内容，并且赋值给当前的data，
    //并且tabs进行foreach遍历，箭头函数拥有两个值，一个是value值，另一个是value对应的index，当e的detail全等于index的时候，把isactive的值变为真，同时触发点击效果
    this.setData({
      tabs
    })
  },

  //滚动条触底
  onReachBottom(){
    console.log("检测到滚动条已经触底");
    if(this.queryparams.pagenum>=this.totalpage){

    }else{
      
    }
  },
  onPullDownRefresh(){
    //下拉刷新，清空数组goodslist，还原初始页码，重新发送请求，并且请求完毕后关闭下拉框
    this.setData({
      goodsList:[]
    })
    this.queryparams.Pagenum=1;
    this.getgoodslist() 
  }
})