Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeline: "activeLine",
    active: 'active',
    activeline1: "",
    active1: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequType.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        console.log(res);
        that.setData({
          sType:res
        })
      }
    })
    //getHotShequ.do
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getHotShequ.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res2 = JSON.parse(res.data);
        //所有的热门资讯资讯
         for(var i=0;i<res2.length;i++){
          var res = res2[i];
          res.img_urls = res.img_urls == '' ? '' : (res.img_urls.indexOf(',') == -1 ? res.img_urls : res.img_urls.split(',')[0]);
         }
        console.log(res2);
        that.setData({
          hotMsg1:res2
        })
      }
    })
    //精华帖
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getJinghuaShequ.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        for(var i=0;i<res.length;i++){
          var img_urls=res[i].img_urls.split(",");
          res[i].img_urls=img_urls;
        }
        that.setData({
          jinghua:res
        })
      }
    })
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        mymsg(res.data);
      },
    })
    function mymsg(user_id){
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getMyMessage.do?user_id=' + user_id,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
        }
      })
    }
  },
  toDetailHot:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/tieDetail/tieDetail?id=' + id,
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
    var that = this;
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequType.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        console.log(res);
        that.setData({
          sType: res
        })
      }
    })
    //getHotShequ.do
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getHotShequ.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res2 = JSON.parse(res.data);
        //所有的热门资讯资讯
        for (var i = 0; i < res2.length; i++) {
          var res = res2[i];
          res.img_urls = res.img_urls == '' ? '' : (res.img_urls.indexOf(',') == -1 ? res.img_urls : res.img_urls.split(',')[0]);
        }
        console.log(res2);
        that.setData({
          hotMsg1: res2
        })
      }
    })
    //精华帖
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getJinghuaShequ.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);

        for (var i = 0; i < res.length; i++) {
          var img_urls = res[i].img_urls.split(",");
          res[i].img_urls = img_urls;
        }
        that.setData({
          jinghua: res
        })
      }
    })
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        mymsg(res.data);
      },
    })
    function mymsg(user_id) {
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getMyMessage.do?user_id=' + user_id,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
        }
      })
    }
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
  changePages: function (e) {
    // wx.redirectTo({
    //   url: '',
    // })
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
  },
  seeContent: function (e) {//查看资讯详情
    var id = e.currentTarget.dataset.id;
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

  },
  lucy: function (e) {
    var that = this;
    var changePage = e.currentTarget.dataset.type;
    console.log(changePage);
    if (changePage == '1') {
      that.setData({
        activeline: "activeLine",
        active: 'active',
        activeline1: "",
        active1: '',
      })
      wx.request({
        // 2ajst6.natappfree.cc
        // https://maxbeijing.mxlgsl.cn
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getJinghuaShequ.do',
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);

          for (var i = 0; i < res.length; i++) {
            var img_urls = res[i].img_urls.split(",");
            res[i].img_urls = img_urls;
          }
          that.setData({
            jinghua: res
          })
        }
      })
    } else {
      that.setData({
        activeline: "",
        active: '',
        activeline1: "activeLine",
        active1: 'active',
      })
      // https://maxbeijing.mxlgsl.cn/Miao/shequ/getAllShequ.do
      wx.request({
        // 2ajst6.natappfree.cc
        // https://maxbeijing.mxlgsl.cn
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getAllShequ.do',
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);

          for (var i = 0; i < res.length; i++) {
            var img_urls = res[i].img_urls.split(",");
            res[i].img_urls = img_urls;
          }
          that.setData({
            jinghua: res
          })
        }
      })
    }
  },
  seeMore:function(){
    wx.navigateTo({
      url: '../../pages/remen/remen',
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
  add: function (e) {//查看资讯详情
    wx.navigateTo({
      url: '../../pages/fatie/fatie',
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
})