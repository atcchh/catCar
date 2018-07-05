// pages/myOrder/myOrder.js
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
    var that=this;
    //https://maxbeijing.mxlgsl.cn/Miao//user/getUserOrder.do?user_id=290
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        if(res){
          getId(res.data);
        }
      },
    })
      function getId(user_id){
        wx.request({
          url: 'https://maxbeijing.mxlgsl.cn/Miao//user/getUserOrder.do?user_id=' + user_id,
          method: "POST",
          dataType: "JSON",
          header: { 'content-type': 'application/json' }, // 默认值
          success: function (res) {
            var res = JSON.parse(res.data);
            console.log(res);
            that.setData({
              order:res
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