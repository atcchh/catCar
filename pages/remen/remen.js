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
    sactive0:"sc-active",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      wx.request({
        //获取热门资讯种类
        //https://maxbeijing.mxlgsl.cn/Miao
        url: "https://maxbeijing.mxlgsl.cn/Miao/shequ/getNewsType.do",//
        success: function (res) {
          console.log(res.data);
          var res = res.data;
          for (var i = 0; i < res.length; i++) {
            res[i].sactive = '';
          }
          res[0].sactive = "sc-active";
          that.setData({
            types:res
          })
          var types2 = res[0].id;
          wx.request({
            //获取热门资讯种类
            //https://maxbeijing.mxlgsl.cn/Miao
            url: "https://maxbeijing.mxlgsl.cn/Miao/shequ/getNewsByTypeId.do?type_id=" + types2,//
            success: function (res) {
              console.log(res.data);
              var res=res.data;
              for(let i=0;i<res.length;i++){
                res[i].see = parseInt((Math.random() * 100) + 1);
                res[i].pinglun = parseInt((Math.random() * 100) + 1);
              }
              console.log(res);
              that.setData({
                pl: res
              })
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

  },
  changePage: function (e) {
    var that = this;
    var changePage = e.currentTarget.dataset.type;
    that.setData({
      show1: changPage
    })
  },
  lucy: function (e) {
    var that = this;
    var changePage = e.currentTarget.dataset.id;
    var types2 = e.currentTarget.dataset.type;
    console.log(changePage);
    var types=that.data.types;
    for(var i=0;i<types.length;i++){
      types[i].sactive='';
    }
    console.log(changePage);
    types[changePage].sactive = "sc-active";
    that.setData({
      types:types
    })
    //根据id获取对应的贴
    wx.request({
      //获取热门资讯种类
      //https://maxbeijing.mxlgsl.cn/Miao
      url: "https://maxbeijing.mxlgsl.cn/Miao/shequ/getNewsByTypeId.do?type_id=" + types2,//
      success: function (res) {
        var res = res.data;
        for (let i = 0; i < res.length; i++) {
          res[i].see = parseInt((Math.random() * 100) + 1);
          res[i].pinglun = parseInt((Math.random() * 100) + 1);
        }
        that.setData({
          pl: res
        })
      }
    })
  },
  toDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/zixunDetail/zixunDetail?id=' + id,
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