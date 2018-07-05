//index.js
//获取应用实例
const app = getApp()
var obj={};
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    obj:{},
    lucy:"tom",
    newUser:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindblur:function(e){
    obj[e.currentTarget.id]=e.detail.value;
    
  }
  , 
  jifenMall:function (e){
    wx.navigateTo({
      url: '../../pages/jifenMall/jifenMall',
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
  gouwuche: function (e) {
    wx.navigateTo({
      url: '../../pages/gouwuche/gouwuche',
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

// {"nonceStr": "1nncbzgjux4auajdg96hkv966tyi2u9o", "package": "prepay_id=wx20180128122724ff1bbc26280958874035", "paySign": "2F38E3FBEC65392C0DFE923999E65288", "signType": "MD5", "timeStamp": "1517113646" }
  pay: function (e) {
    wx.requestPayment({
      'timeStamp': "1517113646",
      'nonceStr': "1nncbzgjux4auajdg96hkv966tyi2u9o",
      'package': "prepay_id=wx20180128122724ff1bbc26280958874035",
      'signType': "MD5",
      'paySign': "2F38E3FBEC65392C0DFE923999E65288",
      'success': function (res) {
        console.log(res);
      },
      'fail':function(res) {
        console.log(res);
      }
})
  },
  ddxq: function (e) {
    wx.navigateTo({
      url: '../../pages/orderDetail/orderDetail',
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
  spDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/spDetail/spDetail',
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
  queren: function (e) {
    wx.navigateTo({
      url: '../../pages/querenOrder/querenOrder',
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
  guanlidizhi: function (e) {
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
  bianjidizhi: function (e) {
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
  },
  dizhi: function (e) {
    wx.navigateTo({
      url: '../../pages/choseDizhi/choseDizhi',
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
  choseModel: function () {
    wx.navigateTo({
      url: '../../pages/choseModel/choseModel',
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
  mall: function () {
    wx.navigateTo({
      url: '../../pages/mall/mall',
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
  login: function () {
    wx.navigateTo({
      url: '../../pages/login/login',
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
  zixun: function () {
    wx.navigateTo({
      url: '../../pages/zixunDetail/zixunDetail',
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
  choseGuwen: function () {
    wx.navigateTo({
      url: '../../pages/choseGuwen/choseGuwen',
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
  wanna: function () {
    wx.navigateTo({
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
  },
  md: function (e) {
    var id=e.currentTarget.id;
    app.requestDetailid=id;
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
  newCar: function () {
    wx.navigateTo({
      url: '../../pages/newCar/newCar',
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
  allreadyLogin: function () {
    wx.navigateTo({
      url: '../../pages/allreadyLogin/allreadyLogin',
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
  choseGender: function () {
    wx.navigateTo({
      url: '../../pages/choseGender/choseGender',
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
  shijia: function () {
    wx.navigateTo({
      url: '../../pages/tryDrive/tryDrive',
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
  myGift: function () {
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
  mine: function () {
    wx.navigateTo({
      url: '../../pages/mine/mine',
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
  choseBrand: function () {
    wx.navigateTo({
      url: '../../pages/choseBrand/choseBrand',
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
  jifen: function () {
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
  doneReg: function () {
    wx.navigateTo({
      url: '../../pages/doneReg/doneReg',
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
  xunjia: function () {
    wx.navigateTo({
      url: '../../pages/askPrice/askPrice',
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
  gomodel: function () {
    wx.navigateTo({
      url: '../../pages/viewModel/viewModel',
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
  details: function () {
    wx.navigateTo({
      url: '../../pages/modelDetails/modelDetails',
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
  gotonext:function(){
    wx.navigateTo({
      url: '../../pages/entry/entry', //"pages/entry/entry"
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
