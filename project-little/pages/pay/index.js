import {  showToast, requestPayment,getSetting,chooseAddress } from "../../utils/asyncWx.js";
import {request} from "../../request/index.js"
Page({
  data: {
    address: {},
    cart: [],
    total_price: 0,
    total_num: 0,
    buynow:[]
  },
  onShow() {
   
    let cart = wx.getStorageSync("cart") || [];
    //过滤购物车数组，把checked为true的东西提取出来
        let pages =  getCurrentPages();
        //在页面栈里，数组中，索引最大的页面就是当前页面，而这个方式是可以拿到当前页面的options的
          let currentPage = pages[pages.length-1];
          const {goods_name,goods_price,goods_big_logo} = currentPage.options;
          cart.push({
            goods_name,goods_price,goods_big_logo,num:1
          }) 
    cart.forEach((item,index) => {
      if(!item.checked){
          cart.filter(v=>!v.checked)
       const address = wx.getStorageSync("address");
        this.setData({
          address
        })
        let total_num = 0;
        let total_price = 0;
        cart.forEach(v => {
          total_num = v.num;
          total_price += v.num * v.goods_price;
        })
 
        this.setData({
          cart,
          total_price,
          total_num,
          address
        })
        console.log("执行没checked")
        total_num= 0;
        total_price=0;
        cart = [];
        cart.splice(index,1);
        console.log(cart)
        console.log(cart.num)

        return;
      }
      else{
        console.log("执行checked有")
        console.log(cart)
        if(item.checked){
          cart.filter(v=>v.checked)
          const address = wx.getStorageSync("address");
           this.setData({
             address
           })
           let total_num = 0;
           let total_price = 0;
           cart.splice(index-1,1)
           cart.forEach(v => {
             total_num += v.num;
             total_price += v.num * v.goods_price;
           })
           this.setData({
             cart,
             total_price,
             total_num,
             address
           })
           cart.splice(index,1);
           total_num=0;
           total_price=0;
           cart = [];
           wx.setStorageSync('cart',cart)
           return
        }
      }
    });
    // cart = cart.filter(v =>{
    //   if(!v.checked){
    //     console.log("bbbbbbbbb")
        
    //     const address = wx.getStorageSync("address");
    //     this.setData({
    //       address
    //     })
    //     let total_num = 0;
    //     let total_price = 0;
    //     cart.forEach(v => {
    //       total_num += v.num;
    //       total_price += v.num * v.goods_price;
    //     })
    //     this.setData({
    //       cart,
    //       total_price,
    //       total_num,
    //       address
    //     })
    //   }
    //   else{
    //     console.log("aaaaaaaaaaaaaa")
    //     const address = wx.getStorageSync("address");
    //     this.setData({
    //       address
    //     })
    //     let total_num = 0;
    //     let total_price = 0;
    //     cart.forEach(v => {
    //       total_num += v.num;
    //       total_price += v.num * v.goods_price;
    //     })
    //     this.setData({
    //       cart,
    //       total_price,
    //       total_num,
    //       address
    //     })
    //   }

    // }
      
      // v.checked
      // );
  },
  // onLoad(options){
  //   console.log(options)
  //   console.log(1111)
  // },
  handleChooseAddress() {
    //es6版本，es7的async是最好的解决方法，但是有兼容问题，所以只能做es6的promise.then
    try {
      const res1 = getSetting().then(
        result => {
          const scopeAddress = result.authSetting["scope.address"];
          if (scopeAddress === false) {
            openSetting().then(result => {
              console.log(result)
            })
          }
          let address = chooseAddress().then(result => {
            result.all=result.provinceName+result.cityName+result.countyName+result.detailInfo
            wx.setStorageSync("address",result);
            //把地址存在缓存
          });
          return;
        }
      )
    } catch (error) {
      console.log(error)
    }
  },
  handleOrderPay() {
    showToast({title:"没有后台，没有企业账号，这一部分没法做"})
  /*  try {
      //1：判断缓存中有没有token
    const token = wx.getStorageSync("token");
    //2:判断
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    //4创建订单，准备请求头参数
    const header = { Authorization: token };
    //组装请求体
    const order_price = this.data.total_price;//订单总价格
    const consignee_addr = this.data.address.all;//拼接好的完整收货地址
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    const orderarams = {
      order_price,consignee_addr,goods
    }
    const {order_number} =request({url:"暂时没后台",methods:"post",data:orderarams,header}).then(result=>{
      console.log(result);
      console.log("如果有后台，这里应该是返回订单编号")
    });
    //5:发起预支付
    const {pay }= request({url:"暂时没有",methods:"post",header,data:{order_number}}).then(result=>{
      console.log(result)
      console.log("这里回来的应该是pay的数据")
    })
      //直接发起微信支付
  requestPayment(pay).then(result=>{console.log(result)});
  //7:查询后台，检查订单状态，看看是否由待支付变已经支付
  const res = request({
    url:"后台没有",
    methods:"POST",
    header,
    data:{order_number}
  }).then(result=>{
    console.log("后台会返回订单状态");
    showToast({title:"支付成功"});
    wx.navigateTo({
      url:'/pages/order/index'
    })

  })
    } catch (error) {
      console.log(error)
      showToast({title:"支付失败"})
    }
    6://手动删除缓存中已经支付 的商品
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart",newCart);    
    */
  }
})

  













//1:从缓存中获取购物车数据，同时把checked属性为true的东西渲染到页面
//2:微信支付，那些人可以使用微信支付。(企业账号)的小程序后台中，必须给开发者添加小程序白名单
//3:当点击支付按钮的时候，先判断缓存中token是否存在，没有就跳授权业获取token，如果有就继续走