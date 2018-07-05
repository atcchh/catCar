Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'请选择',
    date2:'请选择',
    startDate:'',
    endDate:'',
    come_date:"请选择日期"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var src=options.src;
    var type_name = options.carname;
    var type_id = options.type_id;
    var zhidao=options.zhidao;
    var that=this;
    that.setData({
      src:src
    })
    that.setData({
      zhidao: zhidao
    })
    that.setData({
      type_name: type_name
    })
    
    that.setData({
      type_id: type_id
    })
    that.setData({
      startDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()),
      endDate:(new Date().getFullYear()+1) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate()),
      //还需传过来汽车标题 汽车指导价
      //user_id

    })
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({
          userName: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userPhone',
      success: function (res) {
        that.setData({
          userPhone: res.data
        })
      }
    })
   
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id: res.data
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
  bindDateChange: function (e) {
    this.setData({
      come_date: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      userText: e.detail.value
    })
    
  },
  tryName: function (e) {
    this.setData({
      tryName: e.detail.value
    })
  },
  tryPhone: function (e) {

    this.setData({
      tryPhone: e.detail.value
    })
  },
  sub:function(){
    var userText = this.data.userText;
    //日起
    //获取全局变量中的姓名和电话
    // console.log(this.data.tryName);
    // console.log(this.data.tryPhone);
    // console.log(date);
    // console.log(this.data.userText);
    // console.log(this.data.user_id);
    // console.log(this.data.type_id);
    var day=new Date();
    var hh=day.getHours();
    var date = this.data.come_date + " " +hh+"-00-00";
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;//验证手机号
    if (myreg.test(this.data.tryPhone)) {
         wx.request({
                url: 'https://maxbeijing.mxlgsl.cn/Miao/car/submitShijia.do?user_id='+this.data.user_id+"&type_id="+this.data.type_id+"&name="+this.data.tryName+"&phone="+this.data.tryPhone+"&come_date="+date+"&remark="+this.data.userText,
                method: "POST",
                dataType: "JSON",
                header: { 'content-type': 'application/json' }, // 默认值
                success: function (res) {
                  if (res.data==1) {//成功
                    wx.showToast({
                      title: '提交成功',
                      icon: "success",
                      duration: 1000
                    })
                    setTimeout(function () {
                      wx.hideToast()
                      wx.navigateBack();
                    }, 1000)

                  } else {//==0已经注册
                    wx.showToast({
                      title: '提交失败',
                      image: '../../pages/images/fail.png',//自定义弹框图片
                      duration: 1000
                    })

                    setTimeout(function () {
                      wx.hideToast();
                      
                    }, 1000)
                  }
                }
              })
     }else{
      wx.showToast({
        title: '您的手机号有误',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1000)
     }
  }
})