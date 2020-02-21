import { getSetting, chooseAddress, openSetting ,showModal,showToast} from "../../utils/asyncWx.js";
Page({
  data:{
    address:{},
    cart:[],
    allchecked:false,
    total_price:0,
    total_num:0
  },
  onShow(){
   const cart= wx.getStorageSync("cart")||[];
   const address= wx.getStorageSync("address");
  //const allchecked= cart.length?cart.every(v=>v.checked):false;
   //v是每一个循环项，箭头检查每一个循环项里面的checked是不是都是true,但是要注意，空数组如果调用了every，同样也是返回true的
   //数组方法之一，接收一个回调函数，可以遍历全部元素，会强制确认每一个返回的都是true，如果所有返回值都是true，那么every返回的才是true。如果有一个元素的回调结果为false，那么就会结束循环，返回false
    this.setData({
      address
    })
   this.setCart(cart);
  },
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
          }).catch((err)=>{console.log(err)});
        }
      )
    } catch (error) {
      console.log(error)
    }
  },
  //全选
  handeItemchange(e){
    //商品选中
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    //在事件原对象里拿到传过来的goodsid，在this.data里解构cart，定义一个下标，find它，当goodsid等于传过来的goodsid时，可以认为找到。同时cart【index】的checked取反，前台的勾没了的同时，数据也会跟着变
    this.setCart(cart);
  },
  handleItemAllCheck(){
    //1：获取data中的数据
    let {cart,allchecked} = this.data;
    //2:修改数值
    allchecked = !allchecked;
    //3:循环修改商品的选中状态
    cart.forEach(v=>v.checked=allchecked);
    //4:重新填充data
    this.setCart(cart)
  },
  setCart(cart){
    let total_num = 0;
    let total_price = 0;
    let allchecked = true;
    cart.forEach(v=>{
      if(v.checked){
        total_num += v.num;
        total_price += v.num*v.goods_price;
      }else{
        allchecked = false;
      }
    })
    allchecked = cart.length!= 0?allchecked:false;
    this.setData({
      cart,
      total_price,
      total_num,
      allchecked
    })
    wx.setStorageSync("cart",cart);
  },
  handleItemNumEdit(e){
    //左右的加减符合动态函数
    //1:获取参数，什么时候该用事件元？
    const {operation,id} = e.currentTarget.dataset;
    let {cart }= this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      showModal({content:"您是否要删除"}).then(result=>{
        if(result.confirm){
          cart.splice(index,1);
          this.setCart(cart);
        }
      })
    }else{
      cart[index].num+=operation;
      //设置缓存和进data
      this.setCart(cart)
    }
  },
  handlePay(){
    //1:收货地址必须要有
    const {address,total_num} =this.data;
    if(!address.userName){
      showToast({title:"您还没有选择收货地址喔~"});
      return;
    }else if(total_num===0){
      showToast({title:"您还没选购商品啊~"});
      return;
    }else{
     wx.navigateTo({
        url: '/pages/pay/index'
      });
    }
  }
})