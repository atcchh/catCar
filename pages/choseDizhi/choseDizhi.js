// pages/choseDizhi/choseDizhi.js
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
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        getAdd(res.data)
      },
    })
    function getAdd(user_id){
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getAddresses.do?user_id=" + user_id,//
        success: function (res) {
          console.log(res.data);
          var res = res.data;
          that.setData({
            address: res
          })

        }
      })
    }
  },
  guanli:function(e){
    wx.navigateTo({
      url: '../../pages/bianjidizhi/bianjidizhi',
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
  goback:function(e){
    var pages = getCurrentPages();

    var event=e.currentTarget.dataset;
    var currPage = pages[pages.length - 1];
    //当前页面
    var prevPage = pages[pages.length - 2];
    //上一个页面
    // //直接调用上一个页面的setData()方法，
    //把数据存到上一个页面中去
    prevPage.setData({
      mydata: { id:event.id, name:event.name,phone:event.phone,address:event.address }
    })
    wx.navigateBack({
      delta: 1
    })
  }
})