Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var open_id=res.data;
        console.log(res.data);
        wx.request({//根据openid验证是否可以登录
          url: 'https://maxbeijing.mxlgsl.cn/Miao/user/doLogin.do?open_id=' + res.data,//根据openid查看用户是否已经注册
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {//资讯列表
            console.log(res)
            if (res.data) {
              wx.setStorage({
                key: 'user_id',
                data: res.data.user_id
              });
              wx.setStorage({
                key: 'user_name',
                data: res.data.user_name
              });
              wx.setStorage({
                key: 'phone',
                data: res.data.phone
              });
              wx.setStorage({
                key: 'salesman_id',
                data: res.data.salesman_id
              });
              wx.setStorage({
                key: 'salesManName',
                data: res.data.salesman_name
              });
              wx.setStorage({
                key: 'salesman_phone',
                data: res.data.salesman_phone
              });
            }
          }
        })
      },
    })
    
    var that=this;
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/user/getGifts.do",
      success:function(res){
          //var res=JSON.parse(res.data);
          that.setData({
            giftName: res.data[0].gift_name
          })
      }
    })

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
  gobackindex:function(e){

    wx.redirectTo({
      url: "../../pages/allreadyLogin/allreadyLogin",
      success: function (res) {
        // success
        console.log(1);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log(3);
      }
    })
    
  }
})