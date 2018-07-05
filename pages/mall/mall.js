Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3500,
    duration: 500,
    circular: true,
    current: 0,
    indicatorDots: true,
    indicatorActiveColor: "white",
    indicatorColor: "white"
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad:function(options){
    var that=this;
    // 获取所有商品类型
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneyProductTypes.do",
      success: function (res) {
        var res = res.data;
        console.log('type');
        console.log(res);
      }
    })

    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneyProductsByTypeId.do?type_id=" + 7,
      success: function (res) {
        var res = res.data;
        that.setData({
          peijian_sp:res
        })
        console.log(that.data.peijian_sp);
      }
    })
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneyProductsByTypeId.do?type_id=" + 8,
      success: function (res) {
        var res = res.data;
        that.setData({
          yundong_sp: res
        })
        console.log(that.data.yundong_sp);
      }
    })
    //轮播图
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getHotMoneyProducts.do", //https://maxbeijing.mxlgsl.cn/Miao
      success: function (res) {
        var res = res.data;
        console.log(res);
        that.setData({
          lunbo:res
        })
      }
    })
  },
  toSpDetail:function(e){
   // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../pages/spDetail/spDetail?id='+e.currentTarget.dataset.id,
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
  swiperclick: function (e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../pages/spDetail/spDetail?id=' + e.currentTarget.dataset.id,
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