Page({
  data: {
    region: ['北京市', '北京市', '西城区'],
  },
  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  userPhone: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      userPhone: e.detail.value
    });
  },
  userName: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      userName: e.detail.value
    });
  },
  userPhone: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      userPhone: e.detail.value
    });
  },
  userAdd: function (e) {//电话
    var key = e.currentTarget.dataset.name;
    this.setData({
      userAdd: e.detail.value
    });
  },
  save:function(){
    var that=this;
    that.setData({
      disable:true
    })
    that.setData({
      cansave:true
    })
    if(that.data.id){//修改地址
      wx.getStorage({
        key: 'user_id',
        success: function(res) {
          changes(res.data)
        },
      })
      var city = that.data.region[0];
      city += that.data.region[1];
      city += that.data.region[2];
      function changes(userid){
        if (userid && city && city && user_id && that.data.userAdd && that.data.userPhone && that.data.userName && that.data.id ) {
          wx.request({
            //https://maxbeijing.mxlgsl.cn/Miao
            //http://1977644bu3.iask.in/Miao
            url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/updateAddress.do?user_id=" + userid + "&address=" + city + that.data.userAdd + "&phone=" + that.data.userPhone + "&name=" + that.data.userName + "&id=" + that.data.id,//
            success: function (res) {
              console.log(res.data);
              var res = res.data;
              wx.showToast({
                title: '编辑成功',
                icon: "success",
                duration: 1500
              })
              that.setData({
                cansave: false
              })
              setTimeout(function () {
                wx.hideToast();
                that.setData({
                  sc: false
                })
                wx.navigateBack({//返回
                  delta: 1
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: '有未输入项',
            image: '../../pages/images/fail.png',//自定义弹框图片
            duration: 1000
          })

          setTimeout(function () {
            wx.hideToast()
            that.setData({
              canQian: false
            })
          }, 2000)
        }
      }

    }else{
      var region = that.data.region;
      var city = region[0] + region[1] + region[2];
      console.log(city);
      wx.getStorage({
        key: 'user_id',
        success: function (res) {
          save(res.data)
        },
      })


      function save(user_id) {
        if (user_id && city && that.data.userAdd && that.data.userPhone && that.data.userName) {
          wx.request({
            url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/addAddress.do?user_id=" + user_id + "&address=" + city + that.data.userAdd + "&phone=" + that.data.userPhone + "&name=" + that.data.userName,
            success: function (res) {
              console.log(res.data);
              var res = res.data;
              wx.showToast({
                title: '添加成功',
                icon: "success",
                duration: 1500
              })
              that.setData({
                cansave: false
              })
              setTimeout(function () {
                wx.hideToast();
                that.setData({
                  sc: false
                })
                if (that.data.bj) {
                  wx.navigateBack({//返回
                    delta: 1
                  })

                }
              }, 2000)

              if (that.data.bj == "bianji") {

                setTimeout(function () {
                  wx.hideToast();
                  that.setData({
                    sc: false
                  })
                  if (that.data.bj) {
                    wx.navigateBack({//返回
                      delta: 1
                    })

                  }
                }, 2000)
              } else if (that.data.jftj) {
                wx.showToast({
                  title: '添加成功',
                  icon: "success",
                  duration: 1500
                })
                that.setData({
                  cansave: false
                })
                setTimeout(function () {
                  wx.hideToast();
                  wx.navigateBack({//返回
                    delta: 1
                  })
                }, 2000)
              }
            }
          })
        } else {
          wx.showToast({
            title: '有未输入项',
            image: '../../pages/images/fail.png',//自定义弹框图片
            duration: 1000
          })

          setTimeout(function () {
            wx.hideToast()
            that.setData({
              canQian: false
            })
          }, 2000)
        }
      }
    }
  },

  onLoad: function (options) {
    var id="";
    var that = this;
    if(options.id){
      id=options.id;
      
      that.setData({
        id: id
      })
    }else if(options.bj=="编辑"){
      that.setData({
        bj:"编辑"
      })
    } else if (options.jftj){
      that.setData({
        jftj:"添加地址"
      })
    }
  }
})