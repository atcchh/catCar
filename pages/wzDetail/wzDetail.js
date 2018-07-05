// pages/wzDetail/wzDetail.js
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
    that.setData({
      hphm: options.hphm,
      hpzl: options.hpzl,
      engineno: options.engineno,
      classno: options.classno,
    })
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/baoyang/weizhang.do?hphm=' + that.data.hphm + '&hpzl=' + that.data.hpzl + '&engineno=' + that.data.engineno + '&classno=' + that.data.classno,
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        console.log(res);
        var lists = res.result.lists;
        that.setData({
          lists: lists
        });
        var fen = 0;var num = lists.length;
        var money = 0;
        for(var i =0;i<lists.length;i++){
          fen += Number(lists[i].fen);
          money += Number(lists[i].money);
        }
        that.setData({
          fen:fen,
          money:money,
          num:num
        })
        // wx.showToast({
        //   title: '提交失败',
        //   image: '../../pages/images/fail.png',//自定义弹框图片
        //   duration: 1000
        // })

        // setTimeout(function () {
        //   wx.hideToast();

        // }, 1000)
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
  
  }
})