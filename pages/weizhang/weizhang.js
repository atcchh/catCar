// pages/selCar/selCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    places: ['京', '沪', '津', '渝', '黑', '吉', '辽', '蒙', '冀', '新', '甘', '青', '陕', '宁', '豫', '鲁', '晋', '皖', '鄂', '湘', '苏', '川', '黔', '滇', '桂', '藏', '浙', '赣', '粤', '闽', '台', '琼', '港', '澳'],
    btnDis: false,
    leixing:['小型车','大型车'],
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  ipnutChange: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.types;

    if (key == 'carType') {
      that.setData({
        carType: e.detail.value
      });
    } else if (key == 'pai') {
      that.setData({
        pai: e.detail.value
      });
    } else if (key == 'userNames') {
      that.setData({
        userNames: e.detail.value
      });
    } else if (key == 'userPhone') {
      that.setData({
        userPhone: e.detail.value
      });
    } else if (key == 'fadongji') {
      that.setData({
        fadongji: e.detail.value
      });
    } else if (key == 'chejia') {
      that.setData({
        chejia: e.detail.value
      });
    }
    console.log(that.data);
  },
  sub: function (e) {
    var that = this;
    if (!that.data.btnDis) {
      that.setData({
        btnDis: true
      })
      if (that.data.pai && that.data.fadongji && that.data.index && that.data.index2 && that.data.leixing && that.data.chejia) {
        wx.navigateTo({
          url: '../../pages/wzDetail/wzDetail?engineno=' + that.data.fadongji + "&hphm=" + that.data.places[that.data.index] + that.data.pai + '&hpzl=' + that.data.index2 + '&classno=' + that.data.chejia,
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
      } else {
        wx.showToast({
          title: '提交失败',
          image: '../../pages/images/fail.png',//自定义弹框图片
          duration: 2000
        })

        setTimeout(function () {
          wx.hideToast()
          that.setData({
            btnDis: false
          })
          // wx.navigateBack({
          //   delta: 1
          // })
        }, 2000)
      }
    } else {
      return;
    }
  }
})