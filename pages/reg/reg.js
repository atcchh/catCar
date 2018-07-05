Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    uesrCode: "",
    userPhone: "",
    getCodeNum: "获取验证码",
    disabled: false,
    tryName:"",
    tryPhone:"",
    times:60
  },
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          open_id:res.data
        })
      }
    })
  },
  userName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPhone: function (e) {
   
    this.setData({
      userPhone: e.detail.userPhone
    })
    wx.setStorage({
      key: 'userPhone',
      data: e.detail.userPhone
    });
  },
  userCode: function (e) {
    this.setData({
      userCode: e.detail.userCode
    })
  },
  getCode: function () {//获取验证码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  
    if (myreg.test(this.data.userPhone)){
      var that = this;
      var seconds=60;
     // var times=that.data.times;
      console.log("click")
      that.setData({
        disabled:true
      })
      var timer = setInterval(function () {
        var times=that.data.times;
        that.setData({
          times: times-1
        });
        that.setData({
          getCodeNum: that.data.times + "s",
          
        })
        if (that.data.times == 0) {
          clearInterval(timer);
          that.setData({
            getCodeNum: "获取验证码",
            disabled: false,
            times:60
          })
        }
        console.log(that.data.times);
      }, 1000)
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/user/getRegisterCode.do?phone='+this.data.userPhone,
        // data: {  
        //   phone: this.data.userPhone//string
        // },
        method: "POST",
        dataType: "JSON",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          if (res) {//成功
            //console.log(res);
          } else {//==0已经注册
            wx.showToast({
              title: '获取失败',
              image: '../../pages/images/fail.png',//自定义弹框图片
              duration: 1000
            })

            setTimeout(function () {
              wx.hideToast()
            }, 1000)
          }
        }
      })
    }else{
      wx.showToast({
        title: '您的手机号有误',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
   
  },
  userPhone: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      userPhone: e.detail.value
    });
  },
  userCode: function (e) {//验证码
    var key = e.currentTarget.dataset.name;
    this.setData({
      userCode: e.detail.value
    });
  },
  reg: function (e) {//验证验证码
    ///上方跳转为测试
    //var that=this;
    var userName='';
    // console.log(this.data.userName);
    // console.log(this.data.userPhone);
    // console.log(this.data.userCode);
    if (this.data.userPhone && this.data.userCode && this.data.userName){//不为空
      var open_id = this.data.open_id;
      console.log(open_id);
      // wx.setStorage({
      //   key: 'userName',
      //   value: this.data.userName
      // })
      wx.setStorage(
        {
          key: "user_name",
          data: this.data.userName
        }
      )
      wx.setStorage(
        {
          key: "phone",
          data: this.data.userPhone
        }
      )
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/user/checkCode.do?open_id='+open_id+"&phone="+this.data.userPhone+"&code="+this.data.userCode,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json'}, // 默认值
        success: function (res) {
          console.log(res);
          if (res.data==1) {//验证通过  跳页
            wx.showToast({
              title: '注册成功',
              icon: "success",
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 1000)
            // wx.redirectTo({
            //   url: '',
            // })
            wx.redirectTo({
              url: '../../pages/choseGuwen/choseGuwen',
              success: function (res) {
                // success
              },
              fail: function (res) {
                // fail

              },
              complete: function (res) {
                // complete
              }
            })
          } else {//==0用户为注册
            wx.showToast({
              title: '验证失败',
              image: '../../pages/images/fail.png',//自定义弹框图片
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 1000)
          }
        }
      })
    }else if(!this.data.userName){
      wx.showToast({
        title: '姓名有误',
        image: '../../pages/images/fail.png',//自定义弹框图片
        icon: "success",//loading  只有这两种
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }else if(!this.data.userCode){
      wx.showToast({
        title: '验证码有误',
        image: '../../pages/images/fail.png',//自定义弹框图片
        icon: "success",//loading  只有这两种
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
  }
})