Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    uesrCode:"",
    userPhone:"",
    getCodeNum:"获取验证码",
    disabled:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  userName: function (e) {
    this.setData({
      userName: e.detail.userName
    })
  },
  userPhone: function (e) {
    this.setData({
      userPhone: e.detail.userPhone
    })
  },
  userCode: function (e) {
    this.setData({
      userCode: e.detail.userCode
    })
  },
  getCode:function(){
      var time=60;
      var that=this;
      var timer=setInterval(function(){
       time--;
       that.setData({  
          getCodeNum: time+"s",
          disabled:true
          })
          if(time==0){
            clearInterval(timer);
            that.setData({
              getCodeNum:"获取验证码",
              disabled: false
            })
          }
      },1000)
      var userPhone=this.data.userPhone;
      wx.request({
        url: 'http://项目地址/user/getRegisterCode.action', 
        data: {
          phone: userPhone//string
        },
        method: "POST",
        dataType: "JSON",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res == 1) {//成功
            // wx.showToast({
            //   title: '获取成功',
            //   icon: "success",
            //   duration: 1000
            // })
            // setTimeout(function () {
            //   wx.hideToast()
            // }, 1000)

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
  },
  userName: function (e) {//用户名
    var key = e.currentTarget.dataset.name;
    this.setData({
      "userName": e.detail.value
    });
  },
  userPhone: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      "userPhone": e.detail.value
    });
  },
  userCode: function (e) {//验证码
    var key = e.currentTarget.dataset.name;
    this.setData({
      "userCode": e.detail.value
    });
  },
  login:function(e){
    wx.request({
      url: 'http://项目地址/user/checkCode.action',
      data: {
        phone: this.data.userPhone,
        code: this.data.userCode
      },
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        if (res == 1) {//验证通过  跳页
          wx.showToast({
              title: '注册成功',
              icon:"success",
              duration: 1000
          })
          setTimeout(function () {
              wx.hideToast()
          }, 1000)
          wx.navigateTo({
            url: '../../pages/doneReg/doneReg',
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
  }
})