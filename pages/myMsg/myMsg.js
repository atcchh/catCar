// pages/myMsg/myMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeline: "activeLine",
    active: 'active',
    activeline1: "",
    active1: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        zan(res.data)
      },
    })
    function zan(user_id) {
      wx.request({                                                                            //评论id
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getMyMessage.do?user_id=' + user_id ,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          that.setData({
            pllist:res.comment,
            reply:res.reply
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
  changePage: function (e) {
    console.log(1);
    var that=this;
    var changePage = e.currentTarget.dataset.type; 
    console.log(changePage);
    that.setData({
      show1:changPage
    })
  },
  lucy:function (e){
    
    var that=this;
    var changePage = e.currentTarget.dataset.type;
    console.log(changePage);
    if(changePage == '1'){
      that.setData({
        activeline:"activeLine",
        active:'active',
        activeline1: "",
        active1: '',
      })
    }else{
      that.setData({
        activeline: "",
        active: '',
        activeline1: "activeLine",
        active1: 'active',
      })
    }
  }
})