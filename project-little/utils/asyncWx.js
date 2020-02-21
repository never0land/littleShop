export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
  })
  }
  export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
      wx.chooseAddress({
        success:(result)=>{
          resolve(result);
        },
        fail:(err)=>{
          reject(err);
        }
      });
    }).catch((e)=>{});
    //莫名其妙在外面加trycatch没效果，但是在里面加却ok
    }
    export const openSetting=()=>{
      return new Promise((resolve,reject)=>{
        wx.openSetting({
          success:(result)=>{
            resolve(result);
          },
          fail:(err)=>{
            reject(err);
          }
        });
      })
      }






      //封装弹框：showmodal
      export const showModal=({content})=>{
        return new Promise((resolve,reject)=>{
          wx.showModal({
            title:'提示',
            content:content,
            success:(res)=>{
              resolve(res);
            },
            fail:(err)=>{
              reject(err);
            }
          })
        })
        }
      //封装弹框：showmodal
      export const showToast =({title})=>{
        return new Promise((resolve,reject)=>{
          wx.showToast({
            title:title,
            icon:'none',
            success:(res)=>{
              resolve(res);
            },
            fail:(err)=>{
              reject(err);
            }
          })
        })
        }

//     
//封装内置登录
export const login =()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
  }
//封装原生requestpayment
  export const requestPayment =(pay)=>{
    return new Promise((resolve,reject)=>{
      wx.requestPayment({
        ...pay,
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(result)
        }
      });
    })
    }
  











