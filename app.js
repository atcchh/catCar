//app.js
App({
  globalData:{
    openid:'',
  }, 
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //未设置request 合法域名
    wx.login({
      success: function (loginCode) {
        // wx.clearStorage();
        // var APPID = 'wx537b53af8b2033de'; //填写微信小程序appid  
        // var SECRET = '54e5ba5d7ec1a84d0dd71d2f783a0711'; //填写微信小程序secret  
        // //调用request请求api转换登录凭证  
        if(loginCode.code){
          var APPID = 'wx537b53af8b2033de'; 
          var SECRET = '54e5ba5d7ec1a84d0dd71d2f783a0711';
          wx.request({
            url: "https://maxbeijing.mxlgsl.cn/Miao/user/getUserInfo.do?code=" +loginCode.code,//根据code获取用户的openid
            data: { code: loginCode.code },//获取openid 
            header: { 'content-type': 'application/json' },
            success: function (res) {
              globalData: {
                openid: res.data.openid
              }
              //console.log(res.data.openid);
              wx.setStorage({
                key: 'openid',
                data: res.data.openid
              });
              wx.request({//根据openid验证是否可以登录
                url: 'https://maxbeijing.mxlgsl.cn/Miao/user/doLogin.do?open_id=' + res.data.openid,//根据openid查看用户是否已经注册
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {//资讯列表
                   console.log(res.data)
                  if(res.data && (res.data.wodeaiche || res.data.user)){
                    if (res.data.wodeaiche) {
                      wx.setStorage({
                        key: 'chepaihao',
                        data:res.data.wodeaiche.chepaihao
                      });
                      wx.setStorage({
                        key:'xinghao',
                        data:res.data.wodeaiche.aichexinghao,
                      });
                    }
                    if (res.data.user) {
                      wx.setStorage({
                        key: 'address_id',
                        data: res.data.user.address_id
                      });
                      wx.setStorage({
                        key: 'user_id',
                        data: res.data.user.user_id
                      });
                      wx.setStorage({
                        key: 'user_name',
                        data: res.data.user.user_name
                      });
                      wx.setStorage({
                        key: 'phone',
                        data: res.data.user.phone
                      });
                      wx.setStorage({
                        key: 'salesman_id',
                        data: res.data.user.salesman_id
                      });
                      if (res.data.user.salesman_name==null){
                        wx.setStorage({
                          key: 'salesManName',
                          data: ""
                        });
                      }else{
                        wx.setStorage({
                          key: 'salesManName',
                          data: res.data.user.salesman_name
                        });
                      }
                      if (res.data.user.salesman_phone==null){
                        wx.setStorage({
                          key: 'salesman_phone',
                          data: ""
                        });
                      }else{
                        wx.setStorage({
                          key: 'salesman_phone',
                          data: res.data.user.salesman_phone
                        });
                      }
                    }
                    
                  }else{
                    //未注册直接跳转到注册页面
                    // wx.redirectTo({
                      // wx.navigateTo({
                      //   url: '',
                      // })
                    wx.redirectTo({
                      url: "../../pages/reg/reg",
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
                }
              })
            }
          })

          //验证openid 查看用户是否为新用户

        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              wx.setStorage({
                key: 'head_img',
                data: res.userInfo.avatarUrl,
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
  },
  globalData: {
    userInfo: null
  }
})