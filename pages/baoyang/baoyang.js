// pages/baoyang/baoyang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pai:'',
    xinghao:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'chepaihao',
      success: function(res) {
        savepai(res.data);
      },
    })
    function savepai (pai) {
      if (!pai) {
        that.setData({
          pai:''
        })
      }else {
        that.setData({
          pai: pai
        })
      }
    }
    wx.getStorage({
      key: 'xinghao',
      success: function (res) {
        savexinghao(res.data);
      },
    })
    function savexinghao(xinghao) {
      if (!xinghao) {
        that.setData({
          xinghao: ''
        })
      } else {
        that.setData({
          xinghao: xinghao
        })
      }
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
  toselect:function(e){
    wx.navigateTo({
      url: '../../pages/selCar/selCar',
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
  tourls:function(e){
    var that=this;
    var url = e.currentTarget.dataset.url;
    console.log(url);
    wx.navigateTo({
      url: url,
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
  }
})