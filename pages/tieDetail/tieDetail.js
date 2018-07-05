// pages/tieDetail/tieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zan1:"../images/unzan.png",
    shares:'../images/share.png',
    plzan:'../images/unzan.png',
    space: " ",
    zan2: "../images/unzanpl.png",
    states: 0,
  },
  // https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequCommentById.do
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id=options.id;
    that.setData({
      id:id
    })
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      // 帖子详情
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequById.do?id='+that.data.id,
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        console.log(res);
        that.setData({
          tie:res[0]
        })
        var img = that.data.tie.img_urls;
       
        var tieImg = img.indexOf(',') ==-1 ? [img] : img.split(",");
        console.log(tieImg);
        that.setData({
          tieImg:tieImg
        })
      }
    })
    //加载评论
    wx.request({
      // 2ajst6.natappfree.cc
      // https://maxbeijing.mxlgsl.cn
      // 帖子详情
      url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequCommentById.do?id=' + that.data.id,
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        for(var i=0;i<res.length;i++){
          res[i].zan="../images/unzanpl.png";
        }
        console.log(res);
        that.setData({
          pinglun:res
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.tie.title,
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  pinglun:function(e){//评论
  var that=this;
  wx.getStorage({
    key: 'user_id',
    success: function(res) {
      var user_id=res.data;
      wx.getStorage({
        key: 'head_img',
        success: function(result) {
          if(that.data.state){// 回复评论
            pinglunhf(user_id, result.data);
            that.setData({
              state:0
            })
          }else {
            ping(user_id, result.data);
            that.setData({
              state: 0
            })
          }
        },
      })
    },
  })
    function ping(user_id,head_img){
      wx.request({
        // 2ajst6.natappfree.cc
        // https://maxbeijing.mxlgsl.cn
        //user_id, 评论人user_id
        //head_img, 评论人头像
        //shequ_id, 帖子id
        //content,  评论内容
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/addComment.do?user_id=' + user_id+"&shequ_id="+that.data.id+"&content="+e.detail.value+"&head_img="+head_img,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          // 成功后再加载数据
          wx.showToast({
            title: '评论成功',
            icon: "success",
            duration: 1000
          })
          wx.request({
            // 2ajst6.natappfree.cc
            // https://maxbeijing.mxlgsl.cn
            // 帖子详情
            url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequCommentById.do?id=' + that.data.id,
            method: "POST",
            dataType: "JSON",
            header: { 'content-type': 'application/json' }, // 默认值
            success: function (res) {
              var res = JSON.parse(res.data);
              for (var i = 0; i < res.length; i++) {
                res[i].zan = "../images/unzanpl.png";
              }
              console.log(res);
              that.setData({
                pinglun: res
              })
            }
          })
          setTimeout(function () {
            wx.hideToast();
          }, 2000)
        }
      })
    }
    function pinglunhf(user_id, head_img) {
      console.log(that.data.plId);
      wx.request({ //评论id reply为回复的内容
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/addReply.do?user_id=' + user_id + "&comment_id=" + that.data.plId + "&reply=" + e.detail.value + "&head_img=" + head_img,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          wx.showToast({
            title: '回复成功',
            icon: "success",
            duration: 1000
          })
          wx.request({
            // 2ajst6.natappfree.cc
            // https://maxbeijing.mxlgsl.cn
            // 帖子详情
            url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/getShequCommentById.do?id=' + that.data.id,
            method: "POST",
            dataType: "JSON",
            header: { 'content-type': 'application/json' }, // 默认值
            success: function (res) {
              var res = JSON.parse(res.data);
              for (var i = 0; i < res.length; i++) {
                res[i].zan = "../images/unzanpl.png";
              }
              console.log(res);
              that.setData({
                pinglun: res
              })
            }
          })
          setTimeout(function () {
            wx.hideToast();
          }, 2000)
        }
      })
    }
  },
  dianzan:function(){
    var that=this;
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        zan(res.data)
      },
    })
    function zan(user_id){
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/shequDianzan.do?user_id=' + user_id + "&shequ_id=" + that.data.tie.id,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          if(res === 1){
            that.setData({
              zan1:'../images/zan.png'
            })
          }else {
            that.setData({
              zan1: '../images/zan.png'
            })
          }
        }
      })
    }
  },
  dianzanpinglun: function (e) {
    var id=e.currentTarget.dataset.id;
    var index=e.currentTarget.dataset.index;
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        zan(res.data)
      },
    })
    function zan(user_id) {
      wx.request({                                                                            //评论id
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/commentDianzan.do?user_id=' + user_id + "&comment_id=" + id,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          var pinglun = that.data.pinglun;
          if(res==1){
            var pinglunNum = pinglun[index].dianzanshu+1;
            pinglun[index].dianzanshu = pinglunNum;
            pinglun[index].zan = "../images/zanpl.png";
            that.setData({
              pinglun: pinglun
            })
          }else{
            wx.showToast({
              title: '已评论',
              image: '../../pages/images/fail.png',//自定义弹框图片
              duration: 1000
            })
            pinglun[index].zan = "../images/zanpl.png";
            that.setData({
              pinglun: pinglun
            })
            setTimeout(function () {
              wx.hideToast()
              that.setData({
                canQian: false
              })
            }, 2000)
          }
        }
      })
    }
  },
  huifupinglun:function(e){
    var that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        var user_id = res.data;
        wx.getStorage({
          key: 'head_img',
          success: function (result) {
            zan(res.data, result.data);
          },
        })
      },
    })
    //user_id,comment_id,reply,head_img
    function zan(user_id,head_img) {
      wx.request({                                                                          //评论id reply为回复的内容
        url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/addReply.do?user_id=' + user_id + "&comment_id=" + that.data.plId+"&reply="+"测试回复"+"&head_img="+head_img,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
          var res = JSON.parse(res.data);
          console.log(res);
          //1为成功
          // 回复评论

        }
      })
    }
  },
  lucy:function(e){
    var id=e.currentTarget.dataset.id;
    console.log(id);
    var that=this;
    that.setData({
      state:1,
      plId:id,
      focus:true
    })
    console.log(that.data.state);
  }
})