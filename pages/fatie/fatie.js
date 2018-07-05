// pages/fatie/fatie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls:'',
    dis: false,
    showUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindinput: function (e) {
    var that=this;
    var type = e.currentTarget.dataset.type;
    if (type == 'title'){
      that.setData({
        title: e.detail.value
      })
    }else{
        that.setData({
          content: e.detail.value
        })
    }
  },
  upload:function(){
    var that=this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          // 490933a1.nat123.cc
           url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/addImgs.do',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            //do something
            console.log(data);
            var urls=that.data.urls;
            var showurl = that.data.showUrl;
            showurl.push(data.img_url);
            that.setData({
              showUrl: showurl
            })
            urls+=data.img_url+",";
            that.setData({
              urls:urls
            })
            
          }
        })
      }
    })
  },
  sub:function(e){
    var that=this;
    that.setData({
      dis: true
    });
    if(that.data.title && that.data.content || that.data.urls){
      console.log(that.data.content);
      console.log(that.data.title);
      var urls = that.data.urls.substring(0, that.data.urls.length - 1);
      // wx.getStorage({
      //   key: 'user_id',
      //   success: function(res) {
      //     wx.getStorage({
      //       key: 'head_img',
      //       success: function(result) {
      //         send(res.data, result.data);
      //       },
      //     })
      //   },
      // })
      var userId = wx.getStorageSync('user_id');
      var head_img = wx.getStorageSync('head_img') || '';
      send(userId, head_img)
        function send(user_id,head_img){
          console.log(user_id);
          console.log(head_img);
          console.log(that.data.title);
          console.log(that.data.content);
          console.log(urls);
          
          wx.request({
            //http://2ajst6.natappfree.cc
            // https://maxbeijing.mxlgsl.cn
            url: 'https://maxbeijing.mxlgsl.cn/Miao/shequ/addShequ.do?title=' + that.data.title+"&user_id="+ user_id + "&type_id=" + 1 + "&content=" + that.data.content + "&img_urls=" + urls+"&head_img="+ head_img,
            method: "POST",
            dataType: "JSON",
            header: { 'content-type': 'application/json' }, // 默认值
            success: function (res) {
              var res = JSON.parse(res.data);
              if (res==1) {
                wx.showToast({
                  title: '发布成功',
                  icon: "success",
                  duration: 1000
                })
                setTimeout(function () {
                  wx.hideToast();
                  that.setData({
                    dis: false
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }else {
                wx.showToast({
                  title: '发布失败',
                  image: '../../pages/images/fail.png',//自定义弹框图片
                  duration: 1000
                })
                setTimeout(function () {
                  wx.hideToast()
                  that.setData({
                    dis: false
                  })
                }, 2000)
              }
            }
          })
        }
    }
  }
})