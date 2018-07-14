const app = getApp()
var obj = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options,e) {

    var that=this;
    // wx.getStorage({
    //   key: 'user_name',
    //   success: function(res) {
    //     console.log(res.data);
    //     that.setData({
    //       userName:res.data
    //     })
    //   },
    // })
    var userName = wx.getStorageSync('user_name');
    var sex = wx.getStorageSync('sex');
    var salesManName = wx.getStorageSync('salesManName') || '';
    var userPhone = wx.getStorageSync('phone') || '';
    var salesman_phone = wx.getStorageSync('salesman_phone') || '';
    this.setData({
      userName: userName,
      sex: sex,
      guwen: salesManName,
      salesman_name: salesManName,
      userPhone: userPhone,
      salesman_phone: salesman_phone,
    });
    // wx.getStorage({
    //   key: 'sex',
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       sex: res.data
    //     })
    //   },
    // })
    // wx.getStorage({
    //   key: 'salesManName',
    //   success: function (res) {
    //     console.log(res.data);
    //     if (res.data==null){
    //       that.setData({
    //         guwen: ""
    //       })
    //     }else{
    //       that.setData({
    //         guwen: res.data
    //       })
    //     }
        
    //   },
    // })
    // wx.getStorage({
    //   key: 'phone',
    //   success: function (res) {
        
    //     that.setData({
    //       userPhone: res.data
    //     })
    //   },
    // })
    // wx.getStorage({
    //   key: 'salesManName',
    //   success: function (res) {
    //     console.log(res.data);
    //     if (res.data==null){
    //       that.setData({
    //         salesman_name: ""
    //       })
    //     }else{
    //       that.setData({
    //         salesman_name: res.data
    //       })
    //     }
    //   },
    // })
    // wx.getStorage({
    //   key: 'salesman_phone',
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       salesman_phone: res.data
    //     })
    //   },
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        detail(res.data)
      },
    })
    function detail(id) {
      console.log(id);
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/user/getUserPoint.do?user_id=" + id,
        success: function (res) {
          //var res = JSON.parse(res.data);

          var res = res.data;
          console.log(res);
          var num = 0;
          if (res.length) {
            num = res[0].score;
            for(var i=1;i<res.length;i++){
              num += res[i].score;
            }
          }
         that.setData({
           score:num
         })
         console.log(that.data.score);
        }
      })
    }
  },
  toYouhuiquan:function (e){
    wx.navigateTo({
      url: '../../pages/youhuiquan/youhuiquan',
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
  mymsg: function (e) {
    wx.navigateTo({
      url: '../../pages/myMsg/myMsg',
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
  toOrder: function (e) {
    wx.navigateTo({
      url: '../../pages/myOrder/myOrder',
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
  address:function(e){
    wx.navigateTo({
      url: '../../pages/guanlidizhi/guanlidizhi',
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
  myGift:function(){
    wx.navigateTo({
      url: '../../pages/myGift/myGift',
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
  jifen: function (e) {
    wx.navigateTo({
      url: '../../pages/integral/integral',
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
    aboutUs: function () {
    wx.navigateTo({
      url: '../../pages/aboutUs/aboutUs',
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
    changePages: function (e) {
      var url = e.currentTarget.dataset.url;
      // wx.redirectTo({
      //   url: '',
      // })
      wx.redirectTo({
        url: url,
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
    tel: function (e) {
      // wx.getStorage({
      //   key: 'salesman_phone',
      //   success: function (res) {
      //     call(res.data)
      //   },
      // })
      var salesman_phone = wx.getStorageSync('salesman_phone') || '0574-87670555';
      call(salesman_phone);
      function call(phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
          success: function (res) {
            console.log('拨打成功');
          }
        })
      }

    }
})