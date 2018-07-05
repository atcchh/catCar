// pages/youhuiquan/youhuiquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quan: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        getquan(res.data)
      },
    })
    function getquan(id) {
      wx.request({
        url: "http://1977644bu3.iask.in/Miao/moneyProduct/getDiscount.do?user_id=" + 114,//
        success: function (res) {

          var res = res.data;
          console.log(res);
          that.setData({
            quan: res
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

  }
})