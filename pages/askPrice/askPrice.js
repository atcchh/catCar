Page({

  /**
   * 页面的初始数据
   */
  data: {
    userText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var src=options.src;
    var type_id = options.type_id;
    var that=this;
    var zhidao =options.zhidao;
    var type_name = options.carname;

    that.setData({
      type_id: type_id
    })

    that.setData({
      type_name: type_name
    });
    that.setData({
      zhidao: zhidao
    });
    that.setData({
      src: src
    })
    //user_id
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        that.setData({
          user_id:res.data
        })
      },
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
  bindTextAreaBlur:function(e){
    this.setData({
      userText: e.detail.value
    }) 
  },
  sub: function (e) {
      
      var userText=this.data.userText;
      // console.log(this.data.type_id);
      // console.log(userText);
      console.log(this.data.user_id);
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/car/submitXunjia.do?user_id=' + this.data.user_id + "&type_id=" + this.data.type_id + "&content=" + this.data.userText,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          
          if (res.data==1) {//成功
            wx.showToast({
              title: '提交成功',
              icon: "success",
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
              wx.navigateBack();
            }, 1000)
           
          } else {//==0已经注册
            wx.showToast({
              title: '提交失败',
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