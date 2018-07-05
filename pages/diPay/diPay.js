// pages/diPay/diPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      can:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;

    that.setData({
      carBrand:options.carBrand || ''
    })
    that.setData({
      zhidao:"150万"
    })

    that.setData({
      "car_brand": ""
    })
    var suiji = parseInt((Math.random() * 500)+ 90);
    that.setData({
      suiji:suiji
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
    var that=this;
    //console.log(that.data.car_brand);
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
  carName: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      carName: e.detail.value
    })
  },
  qi1: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      qi1: e.detail.value
    })
  },
  qi2: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      qi2: e.detail.value
    })
  },
  getName: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      getName: e.detail.value
    })
  },
  phone: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      phone: e.detail.value
    })
  },
  beizhu: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      beizhu: e.detail.value
    })
  },
  tosel:function(e){
    wx.navigateTo({
      url: '../../pages/md/md',
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
  dijia: function (e) {
    var that=this;
    
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var pricereg = /^[0-9]{1,}$/;

    if (!myreg.test(that.data.phone)) { 
     
      wx.showToast({
        title: '手机号有误',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1500)
      that.setData({
        "can": false
      })
    } else if (!pricereg.test(that.data.qi1)){
      wx.showToast({
        title: '期望价格为整数',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })
     
      setTimeout(function () {
        wx.hideToast()
      }, 1500)
      // that.setData({
      //   "can": false
      // })
    } else if (!pricereg.test(that.data.qi2)){
      wx.showToast({
        title: '期望价格为整数',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })
     
      setTimeout(function () {
        wx.hideToast()
      }, 1500)
      that.setData({
        "can": false
      })
    }else {
      if (!that.data.carName || !that.data.getName) {
         if (!that.data.carName){
           wx.showToast({
             title: '车型有误',
             image: '../../pages/images/fail.png',//自定义弹框图片
             duration: 1000
           })

           setTimeout(function () {
             wx.hideToast()
           }, 1500)
           that.setData({
             "can": false
           })
         } else if (!that.data.getName){
           wx.showToast({
             title: '姓名有误',
             image: '../../pages/images/fail.png',//自定义弹框图片
             duration: 1000
           })

           setTimeout(function () {
             wx.hideToast()
           }, 1500)
           that.setData({
             "can": false
           })
         }
      } else {
        that.setData({
          "can": true
        })
        
        wx.getStorage({
          key: 'user_id',
          success: function(res) {
            pay(res.data)
          },
        })
        //发请求
      }
    }




    //http://1977644bu3.iask.in/Miao/dijia/addDijia.do

      function pay(user_id){
        // console.log(user_id);
        // console.log(that.data.carBrand);
        // console.log(that.data.carName);
        // console.log(that.data.qi1);
        // console.log(that.data.qi2);
        // console.log(that.data.getName);
        // console.log(that.data.phone);
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/dijia/addDijia.do?" + "user_id=" + user_id + "&price=" + "0.01" + "&car_brand=" + that.data.carBrand + "&car_name=" + that.data.carName + "&price_area=" + that.data.qi1 + "-" + that.data.qi2 + "&user_name=" + that.data.getName + "&phone=" + that.data.phone,//是否能签114到
      success: function (res) {
        console.log(res.data);
        var res = res.data;
        wx.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': res.signType,
          'paySign': res.paySign,
          'success': function (res) {
            console.log(res);
            if(res.errMsg.indexOf("ok")){

              wx.showToast({
                title: '支付成功',
                icon: "success",
                duration: 1000
              })
              that.setData({
                "can": false
              })
              setTimeout(function () {
                wx.hideToast();
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }else{
              wx.showToast({
                title: '支付失败',
                image: '../../pages/images/fail.png',//自定义弹框图片
                duration: 1000
              })

              setTimeout(function () {
                wx.hideToast()
              }, 1500)
              that.setData({
                "can": false
              })
            }
          },
          'fail': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付失败',
              image: '../../pages/images/fail.png',//自定义弹框图片
              duration: 1000
            })

            setTimeout(function () {
              wx.hideToast()
            }, 1500)
            that.setData({
              "can": false
            })
          }
        })
      }
    })
      }
  }
})