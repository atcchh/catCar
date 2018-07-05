var app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: "#fff",
    indicatorActiveColor: "#fff",
    autoplay: true,
    interval: 3500,
    duration: 500,
    circular: true,
    current: 0,
    newUser:false,
    qiandao:"每日签到领取50喵币！",
    canQian:false
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
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
    //console.log(e.detail.current);
  },
  swipclick: function (e) {//点击图片触发事件
    // console.log(e.detail.current);
    //根据所传参数判断跳转到什么页面
    var types = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;

    console.log(id);
    if(types==1){//==1跳转到汽车详情
      wx.navigateTo({
        url: '../../pages/modelDetails/modelDetails?id=' + id,
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
    }else if(types==2){//type==2跳转到资讯详情
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
  },
  onLoad: function (options) {
    var that=this;
    var user_id='';
    
    //轮播图
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/getLunbos.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
        var res=JSON.parse(res.data);
        // var imgUrls=[];
        // for(var i=0;i<res.length;i++){
        //   console.log(res[i]);
        //   imgUrls.push(res[i].img_url);
        // }
        that.setData({
          imgUrls: res
        })
      }
    })

    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/news/getNews.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
      //(JSON.parse(res.data)).reverse()
        var result=(JSON.parse(res.data));
        result.length=6;
        that.setData({
          zixun: result
        })
        //console.log(that.data.zixun);
      }
    })
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      },
    })
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneyProductsByTypeId.do?type_id=" + 7,
      success: function (res) {
        var res = res.data;
        var hot = [];

        for (var i = 0; i < res.length; i++) {
          if (res[i].is_hot) {
            hot.push(res[i]);
          }
        }
        hot.length =6;
        that.setData({
          remen: hot
        })
        console.log(that.data.remen);
      }
    })
    // wx.request({
    //   //url: "http://1977644bu3.iask.in/Miao/moneyProduct/getMoneyProducts.do", //https://maxbeijing.mxlgsl.cn/Miao
    //   url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneyProducts.do", //https://maxbeijing.mxlgsl.cn/Miao
    //   success: function (res) {
    //     var res = res.data;
    //     var hot=[];
        
    //     for(var i=0;i<res.length;i++){
    //       if (res[i].is_hot){
    //         hot.push(res[i]);
    //       }
    //     }
    //     that.setData({
    //       remen: hot
    //     })
    //     console.log(that.data.remen);
    //   }
    // })
  },
  onShow:function(){
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          userId: res.data
        })
        checkqindao(res.data)
      },
    })
    function checkqindao(id) {
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/user/checkUserPoint.do?user_id=" + id,//查看是否能签到
        success: function (res) {
          console.log(res.data);
          //var res = JSON.parse(res.data);
          if (res.data == 0) {
            that.setData({
              qiandao: "已签到"
            })
           
          }
        }
      })
    }
  },
  changePage: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      success: function (res) {
        // success
        console.log(1);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        console.log(3);
      }
    })
  },
  changePage2: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
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
  toSp: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../pages/spDetail/spDetail?id="+id,
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
  qiandaos:function(){
    var that=this;
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/userGetPoint.do?user_id=' + that.data.user_id+"&point=50",
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        that.setData({
          canQian:true
        })
        if (res.data==1) {//成功
          wx.showToast({
            title: '签到成功',
            icon: "success",
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast();
            that.setData({
              canQian: false
            })
          }, 2000)
          that.setData({
            qiandao: "已签到"
          })
          
        } else {//==0失败 一日内多次签到
          wx.showToast({
            title: '您已经签到过了哦',
            icon: "success",
            // image: '../../pages/images/fail.png',//自定义弹框图片
            duration: 1000
          })

          setTimeout(function () {
            wx.hideToast()
            that.setData({
              canQian: false
            })
          }, 2000)
          that.setData({
            qiandao:"已签到"
          })
        }
      }
    })
  },
  toWanna:function(e){
    wx.navigateTo({
      url: '../../pages/reg/reg',
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
  seeContent: function (e) {//查看资讯详情
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/zixunDetail/zixunDetail?id='+id,
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
  }
})