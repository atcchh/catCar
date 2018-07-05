Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        that.setData({
          user_id:res.data
        })
        detail(res.data)
      },
    })
    function detail(id){
      console.log(id);
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/user/getUserPoint.do?user_id=" + id,
        success: function (res) {
          //var res = JSON.parse(res.data);
         
          var res=res.data;
          res.reverse();
          console.log(res);
          for(var i=0;i<res.length;i++){
            if(res[i].score>0){
              res[i].color ="color:#F65B4E";
            }else{
              res[i].color = "color:#34A4E4";
            }
          }
          that.setData({
            details:res
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