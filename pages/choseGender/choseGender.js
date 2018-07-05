Page({

  /**
   * 页面的初始数据
   */
  data: {
    acitve2:'active2',
    activeState21:'active2',
    selectMan:true,
    selectWoman:false,
    models_id: 0,
    sex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //http://maxbeijing.mxlgsl.cn:8000/Miao/user/getName.do
    //http://maxbeijing.mxlgsl.cn:8000/Miao/user/getSex.do

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
  selectState1:function(e){
    this.setData({
      activeState21: "active2",
      activeState22: "",
      models_id:0
      //还要传入选定的参数
    })
  },
  selectState2: function (e) {
    this.setData({
      activeState21: "",
      activeState22: "active2",
      models_id:1
      //还要传入选定的参数
    })
  },
  choseGender1:function(e){
      this.setData({
        selectMan:true,
        selectWoman:false,
        sex:1
        //还需设置选中的性别
      })
  },
  choseGender2:function(e){
      this.setData({
        selectMan: false,
        selectWoman: true,
        sex:2
      })
  },
  next:function(e){


    console.log(this.data.sex);
    console.log(this.data.models_id);
    if (this.data.sex && (this.data.models_id==0||this.data.models_id==1)){
          wx.setStorage({
            key: 'sex',
            data: this.data.sex
          }
          );
          wx.setStorage(
            {
              key: 'models_id',
              data: this.data.models_id
            }
          );

          wx.redirectTo({
        url: '../../pages/wanna/wanna',
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
    }else{
      wx.showToast({
        title: '选择失败',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
  }
})