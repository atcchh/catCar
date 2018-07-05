// pages/guanlidizhi/guanlidizhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bj:false,
    sc:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      //查找收货地址
      wx.getStorage({
        key: 'user_id',
        success: function(res) {
          that.setData({
            user_id:res.data
          })
          getAdd(res.data)
        },
      })
      function getAdd(id){
        wx.request({
         // https://maxbeijing.mxlgsl.cn/Miao
         // url: "http://1977644bu3.iask.in/Miao/moneyProduct/getAddresses.do?user_id=" + 114,//
          url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getAddresses.do?user_id=" + id,//
          success: function (res) {
            wx.getStorage({
              key: 'address_id',
              success: function (result) {
                saveId(result.data)
              },
            })
            var res = res.data;
            function saveId(id){
              console.log(id);
              for (var i = 0; i < res.length; i++) {
                res[i].sc = false;
                res[i].show = true;
                res[i].urls = "";
                if(res[i].id==id){
                  res[i].urls = "../images/right.png";
                }
              }
              that.setData({
                address: res
              })
            }
          }
        })
        //获取默认地址
      }


      //修改收货地址  没有返回值


      //       wx.request({
      //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/updateAddress.do?user_id=" + 114 + "&address=" + "北京市门头沟区惠康家园五区五号楼5单元1901" + "&phone=" + 13381039760 + "&name=" + "李超"+"&id="+'2',//
      //   success: function (res) {
      //     console.log(res.data);
      //     var res = res.data;

      //   }
      // })

  },
  toUpdate:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/bianjidizhi/bianjidizhi?id='+id,
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
  toDelete:function(e){
    var id = e.currentTarget.dataset.id;
    var that=this;
    var index=e.currentTarget.dataset.index;
    var result=that.data.address;
    result[index].sc=true;

    that.setData({
      address: result
    })
    // wx.getStorage({
    //   key: 'user_id',
    //   success: function(res) {
    //       getAdd(res.data)
    //   },
    // })
    getAdd(id);
      function getAdd(id){
        wx.request({
          //https://maxbeijing.mxlgsl.cn/Miao
          //url: "http://1977644bu3.iask.in/Miao/moneyProduct/deleteAddress.do?id=" + id,//
          url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/deleteAddress.do?id=" + id,//
          success: function (res) {
            console.log(res.data);
            var res = res.data;
            for (var i = 0; i < result.length; i++) {
              result[i].sc = false;
              
            }
            result[index].show = false;
          
            that.setData({
              address: result
            })
            console.log(that.data.address);
            
            wx.showToast({
              title: '删除成功',
              icon: "success",
              duration: 1500
            })



            setTimeout(function () {
              wx.hideToast();
            }, 2000)

          }
        })
      }
  },
  add:function(e){
    wx.navigateTo({
      url: '../../pages/bianjidizhi/bianjidizhi?bj='+"编辑",
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
    //查找收货地址
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        getAdd(res.data)
      },
    })
    function getAdd(id) {
      wx.request({
        // https://maxbeijing.mxlgsl.cn/Miao
        // url: "http://1977644bu3.iask.in/Miao/moneyProduct/getAddresses.do?user_id=" + 114,//
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getAddresses.do?user_id=" + id,//
        success: function (res) {

          var res = res.data;
          console.log(res);
          for (var i = 0; i < res.length; i++) {
            res[i].sc = false;
            res[i].show = true;
          }
          that.setData({
            address: res
          })

          console.log(res);
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
  guanli:function (e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var add=that.data.address;
    for (var i=0;i<add.length;i++){
      add[i].urls="";
    }
    add[index].urls ="../images/right.png";
    that.setData({
      address:add
    });
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        guanli(res.data)
      },
    })
    function guanli(user_id){
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/user/setMorenDizhi.do?user_id=' + user_id + "&address_id=" + id,
        method: "POST",
        dataType: "JSON",
        header: { 'content-type': 'application/json' }, // 默认值
        success: function (res) {
        }
      })
    }
  }
})