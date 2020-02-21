import { request } from "../../request/index.js"
Page({


  /*
  搜索中心后台，接收一个东西，以这个东西来include
  只要包含的东西就返回来，这样子可以兼职模糊查询
  商品信息必须要有goods_id，超链接的时候可以直接跳
  */
  data: ({
    goods: [],
    isFocus:false,
    inpValue:""
  }),
  Timerid: -1,

  //1:给输入框绑定值改变事件：bindinput

  handleInput(e) {
    //1：输入框值改变事件
    const { value } = e.detail;
    //直接解构拿输入框的值
    if (!value.trim()) {
      this.setData({
        goods:[],
        isFocus:false   
       })
      return;
      //杜绝全空格等基本的
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.Timerid);
    this.Timerid = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  qsearch(type) {
    request({ url: "/search", data: { type } }).then(result => {
      this.setData({
        goods: result.data.data
      })
    })
  },
  handleCancel(){
    //点击取消按钮要做的事
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    }
)
  }









})