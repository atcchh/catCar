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
    indicatorDots:true,
    indicatorActiveColor:"white",
    indicatorColor:"white"
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
  onLoad: function (options) {
    var that = this;
    wx.request({//https://maxbeijing.mxlgsl.cn/Miao
      url: "https://maxbeijing.mxlgsl.cn/Miao/product/getProducts.do",//获取所有商品(积分商城)
     // url: "https://maxbeijing.mxlgsl.cn/Miao/product/getProducts.do",//获取所有商品(积分商城)
      success: function (res) {
        console.log(res.data);
        //point 积分  point_price  金额
        var res = res.data;
        that.setData({
          jifen_sp: res
        })
        console.log(res);
        
      }
      })
      //轮播图
      wx.request({//https://maxbeijing.mxlgsl.cn/Miao
      url: "https://maxbeijing.mxlgsl.cn/Miao/product/getHotProducts.do",
      success: function (res) {
        var res = res.data;
        console.log(res);
        that.setData({
          lunbo:res
        })
      }
    })
  },
  swiperclick:function(e){
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var des = e.currentTarget.dataset.des;
    var point = e.currentTarget.dataset.point;
    wx.navigateTo({
      url: '../../pages/spDetailJf/spDetailJf?id=' + id + "&name=" + name + "&des=" + des + "&point=" + point,
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
  buy:function(e){
    //getProduct
    var that = this;
    //获取sku_id
    wx.request({//https://maxbeijing.mxlgsl.cn/Miao
         url: "http://1977644bu3.iask.in/Miao/product/getSku.do?product_id="+442+"&color_id="+"2"+"&size_id="+"1",//获取所有商品(积分商城)
         success: function (res) {
           var res = res.data;
           console.log(res);
           //id为 sku_id points point_price
              if(res.id){
                //根据sku_id查询 库存
                wx.request({
                  url: "http://1977644bu3.iask.in/Miao/product/getSkuById.do?id=" + res.id ,
                  success: function (res) {
                    var res2 = res.data;
                    console.log(res2);

                  }
                })
              }
         } 
       })


       //支付 sku_id count

  },
  toPay: function (e) {
    var that = this;
    wx.request({
      url: 'http://1977644bu3.iask.in/Miao/product/productPrepay.do', //仅为示例，并非真实的接口地址
      data: {          //参数为json格式数据
        user_id: 114,
        address_id: 2,
        detail: [
          { sku_id: "39", count: 2}
        ]
      },
      header: {
        //设置参数内容类型为json
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var res = res.data;
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
  toSpDetailJf:function(e){
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var des=e.currentTarget.dataset.des;
    var point = e.currentTarget.dataset.point;
    wx.navigateTo({
      url: '../../pages/spDetailJf/spDetailJf?id='+id+"&name="+name+"&des="+des+"&point="+point,
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