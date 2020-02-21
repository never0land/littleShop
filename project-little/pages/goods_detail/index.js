import { request } from "../../request/index.js";
Page({
  data: {
    goods_obj: {},
    p1:"../../icons/shoucang.png",
    p2:"../../icons/s.png",
    isCollect:false//商品是否被收藏
  },
  GoodsInfo: {},
  onShow: function () {
    let pages = getCurrentPages();
    let currentpage = pages[pages.length - 1];
    let options = currentpage.options
    const { goods_id } = options;
    // console.log(options);
    // console.log("商品详情页的数据");
    this.getGoodsDetail(goods_id);








  },
  handleCollect(){
    let isCollect = false;
    //商品收藏
    let collect = wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
    console.log(index)
    if(index!==-1){
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync("collect",collect)
    this.setData({
      isCollect
    })




  },





  getGoodsDetail(goods_id) {
    const goods_obj = request({
      url: "/goods/detail/",
      data: { goods_id }
    }).then(result => {
      this.GoodsInfo = result.data.data;
      //商品缓存
      let collect = wx.getStorageSync("colect") || [];
      //判断缓存数组是否有当前商品
      let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)//只要回调有一个true,整个返回结果就是true
      this.setData({
        // goods_obj:result.data.data//,数据里面应该是刚刚好的，太多多余的数据会造成性能降低，人话就是卡
        goods_obj: {
          goods_name: result.data.data.goods_name,
          //iphone部分机不适应web图片格式，前端自行改格式
          pics: result.data.data.pics,
          //  goods_introduce:result.data.data.goods_introduce.replace(/\.webp/g,'.jpg'),
          goods_introduce: result.data.data.goods_introduce,
          //全局找webp图片，如果有，那么换成jpg
          goods_price: result.data.data.goods_price,
          a:result.data.data

        },
        isCollect
      })
    })
  },

  //小程序的放大镜
  handlePrevewImage(e) {
    //1:起预览图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pice_big);
    //2:接收你点了什么鬼图片
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });

  },
  handlecartAdd() {
    // console.log("sadasdasd")
    let cart = wx.getStorageSync("cart") || [];
    //||[]转换格式，可以肯定cart是数组
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    //判断商品对象收存在购物车数组中
    if (index === -1) {
      //不存在，第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    //把购物车重新添加回缓存中
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
      //把遮罩打开，可以防止用户抽筋，狂按
    });
  }
  // handleBuyNow(GoodsInfo) {
  //   console.log(this.GoodsInfo)
  //   let {goods_name,goods_price} = this.GoodsInfo
  //   // console.log("sadasdasd")
  //   let buynow = wx.getStorageSync("buynowbuynow") || [];
  //   //||[]转换格式，可以肯定cart是数组
  //   this.GoodsInfo.num = 1;
  //   this.GoodsInfo.checked = true;
  //   //添加自定义属性、对象
  //   buynow.push(this.GoodsInfo);
  //   wx.setStorageSync("buynow", buynow);

  //   // wx.navigateTo({
  //   //   url: '/pages/pay/index?goods_obj=goods_name',
  //   //   data:GoodsInfo
  //   // });
  // }


})