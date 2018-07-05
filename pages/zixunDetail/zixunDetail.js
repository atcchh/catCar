var WxParse = require('../../wxParse/wxParse.js');
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
    // that.setData({
    //   id:options.id
    // })
    var id=options.id;
    var that=this;
    var article = ``;
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/news/getNew.do?id='+id,//咨询列表
      //data: { id:id },
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res=JSON.parse(res.data);
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
        article=res.content;
          wx.request({
            url: 'https://maxbeijing.mxlgsl.cn/Miao/news/getComments.do?news_id=' + id,//评论列表
            //data: { news_id: id },
            method: "POST",
            dataType: "JSON",
            header: { 'content-type': 'application/json' }, // 默认值
            success: function (res) {
              //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
              //排列序号 sort
              var res = JSON.parse(res.data);
              console.log(res);
              for(var i=0;i<res.length;i++){
                article += res[i].content;
              } 
              WxParse.wxParse('article', 'html', article, that, 5);
            }
          })
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