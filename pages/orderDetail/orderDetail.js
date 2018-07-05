// pages/orderDetail/orderDetail.js
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
    var sku_id=options.sku_id;
      console.log(sku_id);
      var that=this;
      if(sku_idF){
        wx.request({
          url: "https://maxbeijing.mxlgsl.cn/Miao/product/getSkuById.do?id=" + sku_id,
          success: function (res) {
            var res2 = res.data;
            console.log(res2);
            that.setData({
              res2: res2
            })
            that.setData({
              count:options.count
            })
          }
        })
      }
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
  calling: function () {
    // wx.getStorage({
    //   key: 'salesman_phone',
    //   success: function(res) {
    //     phone(res.data)
    //   },
    // })
    var salesman_phone = wx.getStorageSync('salesman_phone') || '‭‭0574-87670555';
    phone(salesman_phone);
    function phone(num){
      wx.makePhoneCall({
        phoneNumber: num, //此号码并非真实电话号码，仅用于测试  
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }
  },
})