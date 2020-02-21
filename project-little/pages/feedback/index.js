// pages/feedback/index.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"日常体验建议",
        isActive:true
      },
      {
        id:1,
        value:"商品建议",
        isActive:false
      }
    ],
    chooseImages:[],
    textval:"",
    upLoadImgs:[]
    //上传成功后，服务器返回来的东西容纳
  },
  handleTabsItemChange(e){
    //获取点击的下标，注意，这个东西是在父组件获取的，不是在子组件
    const {index} =e.detail;
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          //图片数组进行拼接，为了避免一张张传会把旧数据给顶了
          chooseImages:[...this.data.chooseImages,...result.tempFilePaths]

        })
      }
    });
      
  },
  //删除图片,关键获取点击元素的索引，获取data中的图片素组，把对应的index在数组中删除，然后重新渲染素组
  handleRemoveImg(e){
    console.log(e)
    const {index} = e.currentTarget.dataset;
    //这样子的写法可以把后面的给省了
    let {chooseImages} = this.data;
    chooseImages.splice(index,1);
    this.setData({
      chooseImages
    })
  },
  handletextinput(e){
    this.setData({
      textval:e.detail.value
    })
  },
  handleformsubmit(){
    //提交按钮的动作
    const {textval,chooseImages} = this.data;
    if(!textval.trim()){
      wx.showToast({
        title: '输入有误，请检查',
        icon: 'none',
        mask: true,
      });
      return;
    }
    chooseImages.forEach((v,i)=>{
      wx.uploadFile({
        url: 'http://www.sevensumer.com:3000/user/file',
        filePath:v ,
        name:"file" ,
        formData: {},
        success: (result) => {
          console.log(result.data)
          let url = JSON.parse(result.data).url;
          console.log(url)
          let {upLoadImgs} = this.data
          upLoadImgs.push(url);
          console.log(upLoadImgs)
          //this.upLoadImgs.push(url);
          //所有的图片都上传完才触发，wx。uploadfile是异步的。这里必须要做同步处理
          if(i===chooseImages.length-1){
            //代表循环的数组走到最后一个
            //正常来说，图片数组传完后，和文字是要一起重新发回来后台的，但是我不知道拿来干嘛好
            this.setData({
              textval:"",
              chooseImages:[]
              //重置页面
            })
            wx.navigateBack({
              delta:1
            })
          }
        }
      });
    })










    //准备上传图片
    //警告：这货不支持批量上传，只能一张张来!!!!
    //1:遍历图片数组
    //2：逐个上传
    //3：整理服务器返回的东西,因为多个文件上传就会有多个东西返回

      




  }
















})


/*





*/