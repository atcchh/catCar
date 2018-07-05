// pages/orderDetail/orderDetail.js
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
    var sku_idF=options.sku_idF;
      console.log(sku_idF);
      var that=this;
      if(sku_idF){
        wx.request({
          //https://maxbeijing.mxlgsl.cn/Miao
          url: "https://maxbeijing.mxlgsl.cn/Miao/product/getSkuById.do?id=" + sku_idF,
          success: function (res) {
            var res2 = res.data;
            console.log(res2);
            that.setData({
              res2: res2
            })
            that.setData({
              count:options.count
            })
          }
        })
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var date=date.getDate();
        var dates=date+"-"+month+"-"+date
        that.setData({
          time: dates
        })
      }
      wx.getStorage({
        key: 'user_id',
        success: function(res) {
          getAdd(user_id)
        },
      })
        function getAdd(user_id){
          wx.request({
            //https://maxbeijing.mxlgsl.cn/Miao
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
  phoneCall:function(e){
    var that=this;
    var phone='';
    // wx.getStorage({
    //   key: 'salesman_phone',
    //   success: function(res) {
        
    //     call(res.data)
    //   },
    // })
    var salesman_phone = wx.getStorageSync('salesman_phone') || '‭‭0574-87670555';
    call(salesman_phone);
    function call(phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function (res) {
          console.log('拨打成功');
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
  calling: function () {
    // wx.getStorage({
    //   key: 'salesman_phone',
    //   success: function (res) {
    //     phone(res.data)
    //   },
    // })
    var salesman_phone = wx.getStorageSync('salesman_phone') || '‭‭0574-87670555';
    phone(salesman_phone);
    function phone(num) {
      wx.makePhoneCall({
        phoneNumber: num, //此号码并非真实电话号码，仅用于测试  
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }
  },
})