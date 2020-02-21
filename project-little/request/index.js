//同时发送异步请求次数
let ajaxTimes=0;
export const request=(params)=>{
    //首先检查url是否带有/main
    let header = {...params.header}
    if(params.url.includes("/main")){
        //如果url包含/main，那么拼接header，带上token
        header["Authorization"]=wx.getStorageSync("token");
    }
        //1:根据接口路径判断是否需要加请求头，如果请求路径带/main/那么自动带上请求头
    ajaxTimes++
    //设置全局加载
   wx.showLoading({
        title: "加载中",
        mask: true
    });
    const baseUrl ="http://www.sevensumer.com:3000";
    //sevensumer是线上服务器，fastmock是mock服务器
    // const baseUrl ="https://www.fastmock.site/mock/0c709a8911061c90e026f9c29066b405/ConventionalLittle";
    return new Promise((resolve,reject)=>{
    //新建一个promise对象（里面有两个回调函数：成功的时候走resolve,失败的时候走reject）并且返回
        wx.request({
            ...params,
      //解构params
            header:header,//把header也放在需要发送的参数上
            url:baseUrl+params.url,
//url拼接
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                wx.hideLoading();
            }
            }
        });
    })
}