export const request=(params)=>{
  //静态指定request,箭头函数接收params
  const baseUrl="https://www.fastmock.site/mock/0c709a8911061c90e026f9c29066b405/ConventionalLittle"
  //https://www.fastmock.site/mock/9b2286638decb6ab249e79392e2df02e后台自己mock的地址，真上场的时候再换服务器地址
  return new Promise((resolve,reject)=>{
    //新建一个promise对象（里面有两个回调函数：成功的时候走resolve,失败的时候走reject）并且返回
    wx.request({
      //发起微信请求
      ...params,
      url:baseUrl+params.url,
      //解构params
      success:(result)=>{
        //成功的时候
        resolve(result);
      },
      fail:(err)=>{
        //失败的时候
        reject(err);
      }
    });
  })
}