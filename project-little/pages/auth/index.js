import {request} from "../../request/index.js"
import {login} from "../../utils/asyncWx.js"
Page({
  //获取用户信息
  handleGetUserInfo(e){
    try {
            //1获取用户信息
            const {encryptedData,rawData,iv,signature}=e.detail;
            //获取小程序登录成功后的code
            const code=login().then(result=>{
              console.log(code);
              console.log("因为没有后台，所以有效的只能拿到code")
            })
            const loginParams = {
              encryptedData,rawData,iv,signature,code
            }
            //3发送请求，把encryptedData,rawData,iv,signature，code带上，换取token
          /*  request({url:"/users/wxlogin",data:loginParams,methods:"post"}).then(result=>{
              //4:把token存个缓存，同时跳转回上一个页面
              wx.setStorageSync("token",token);
              wx.navigateBack({
                delta:1
              })
            });*/
    } catch (error) {
      console.log(error)
    }
  }
  
})