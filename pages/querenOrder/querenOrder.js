// pages/querenOrder/querenOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circular: true,
    current: 0,
    user_id: "",
    showModalStatus: false,
    showModalStatus2: false,
    counts: 1,
    hui:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var product_id=options.product_id;
    console.log(product_id);
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        function getAdd(user_id) {
          wx.request({  //https://maxbeijing.mxlgsl.cn/Miao
            url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getAddresses.do?user_id=" + user_id,//
            success: function (res) {
              console.log(res.data);
              var res = res.data;
              that.setData({
                address: res
              })
            }
          })
        }
      },
    })

  },
  toPay:function(e){
    var that=this;
    wx.request({
      url: 'http://1977644bu3.iask.in/Miao/moneyProduct/moneyProductPrepay.do',
     // url: 'https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/moneyProductPrepay.do', //仅为示例，并非真实的接口地址
      data: {          //参数为json格式数据
        user_id: 114,
        address_id:2,
        discount_id: 1,
        is_kuaidi:0,
        detail: [
          { sku_id: "1", count: 1, cart_id: ""}
          // { sku_id: "5", count: 1,cart_id:"9"} cart_id是购物车id在购物车结账中使用
        ]
      },
      header: {
        //设置参数内容类型为json
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var res=res.data;
        //成功后调取支付接口
        if (res) {
          wx.requestPayment({
            'timeStamp': res.timeStamp,
            'nonceStr': res.nonceStr,
            'package': res.package,
            'signType': res.signType,
            'paySign': res.paySign,
            'success': function (res) {
              console.log(res);
              if (res.errMsg.indexOf("ok")) {
                that.setData({
                  "can": false
                })


                wx.navigateTo({
                  url: '../../pages/orderDetail/orderDetail?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
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
  powerDrawer: function (e) {
    var that=this;
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    if (e.currentTarget.dataset.click==0){//送货方式
        that.setData({
          hui:false
        })
    }else{//优惠券
      that.setData({
        hui: true
      })
    }
  },
  powerDrawer2: function (e) {
    var currentStatu2 = e.currentTarget.dataset.statu;
    this.util(currentStatu2)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  util2: function (currentStatu2) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData2: animation.export()
    })
    this.setData({
      animationData2: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu2 == "close") {
        this.setData(
          {
            showModalStatus2: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu2 == "open") {
      this.setData(
        {
          showModalStatus2: true
        }
      );
    }
  },
  toAdd:function(){
    wx.navigateTo({
      url: '../../pages/bianjidizhi/bianjidizhi',
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