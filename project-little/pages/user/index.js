import { getSetting, chooseAddress, openSetting ,showModal,showToast} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNums:0
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect")||[]
      this.setData({
        userInfo,
        collectNums:collect.length
      })
  },
  contact(){
    wx.makePhoneCall({
      phoneNumber: '15800023067',
    }); 
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
  scan(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
      success: (result) => {
        console.log(result)
      }
    });
      
  }
})