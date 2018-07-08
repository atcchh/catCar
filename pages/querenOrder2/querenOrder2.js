// pages/querenOrder2/querenOrder2.js
// pages/querenOrder/querenOrder.js
Page({

  /**
   * 页面的初始数
   * 
   * 
   * 据
   */
  data: {
    circular: true,
    current: 0,
    user_id: "",
    showModalStatus: false,
    showModalStatus2: false,
    hui: false,
    songType:"到店自取",
    types:0,
    yunfei:0,
    pici: '选择优惠券',
    discount_id: '',
    srcCoupon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var skujson = ''; var productList ='';
    if(options.skujson){
      skujson = JSON.parse(options.skujson);
      productList = JSON.parse(options.productList);
    }
    var that = this;
    that.setData({
      point:options.point,
      des:options.des,
      allprice: options.allprice,
      heprice: Number(options.heprice),
      counts:options.counts,
      skujson:skujson,
      productList: productList
    })
    console.log(that.data.skujson);
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        getAdd(res.data)
        getquan(res.data)
      },
    })
    function getquan(id) {
      wx.request({
        //url: "http://1977644bu3.iask.in/Miao/moneyProduct/getDiscount.do?user_id=" + 114,//
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getDiscount.do?user_id=" + id,//
        success: function (res) {

          var res = res.data;
          console.log(res);
          that.setData({
            youhuiquans: res
          })
        }
      })
    }
    function getAdd(user_id){

      wx.request({
        //https://maxbeijing.mxlgsl.cn/Miao
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getAddresses.do?user_id=" + user_id,//
        success: function (res) {
          console.log(res.data);
          var res = res.data;
          wx.getStorage({
            key: 'address_id',
            success: function (res) {
              moren(res.data)
            },
          })
          function moren(id){
            for(var i=0;i<res.length;i++){
              console.log(id);
              if(res[i].id==id){
                that.setData({
                  address: res[i]//暂时当做默认
                })
              }else{
                that.setData({
                  address: res[0]//暂时当做默认
                })  
              }
            }
          }
        }
      })
      var count = options.count;
      var sku_id = options.sku_id;
      console.log(count);
      console.log(sku_id);
     
      that.setData({
        count: count
      })
     that.setData({
       froms:options.froms
     })
      if (options.froms && !options.skujson){
        wx.request({
          //https://maxbeijing.mxlgsl.cn/Miao
          url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=" + sku_id,
          success: function (res) {
            var res2 = res.data;
            that.setData({
              res2: res2
            })
          }
        })
      }else{
        if (!options.skujson) {
          wx.request({
            //https://maxbeijing.mxlgsl.cn/Miao
            url: "https://maxbeijing.mxlgsl.cn/Miao/product/getSkuById.do?id=" + sku_id,
            success: function (res) {
              var res2 = res.data;
              console.log(res2);
              that.setData({
                res2: res2
              })
            }
          })
        }
      }

    }

  },
  selquan:function (e){
    // 选择购物券
    var that = this;
    var id = e.currentTarget.dataset.id;
    var pici = e.currentTarget.dataset.pici;
    console.log(id);
    console.log(pici);
    that.setData({
      pici:pici,
      discount_id:id
    });
  },
  changeAdd:function(){
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
  selWay:function(e){
    var that=this;
    var type =e.currentTarget.dataset.type;
    if(type=="zi"){
      that.setData({
        srcZi:"../images/se_red.png",
        types:0,
        srcKd:""
      })
    }else{
      that.setData({
        srcZi: "",
        types:1,
        srcKd: "../images/se_red.png"
      })
    }
  },
  toPay: function (e) {
    var that = this;
    that.setData({
      disable:true
    })
    //console.log(that.data.address);
    if(!that.data.address){
      wx.showToast({
        title: '未选择地址',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 1500)
      that.setData({
        disable: false
      })
    }else{
      wx.getStorage({
        key: 'user_id',
        success: function (res) {
          if (that.data.skujson) {
            pay2(res.data);
          }else if (that.data.froms){
            pay2(res.data)
          }else{
            pay(res.data)
          }
        },
      })
    }
    function pay(user_id){
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/product/productPrepay.do',
        data: {          //参数为json格式数据
          user_id: user_id,//114
          address_id: that.data.address.id,
          is_kuaidi: that.data.types,//0为自提，1为快递
          // that.data.res2.id
          detail: [{ sku_id: that.data.res2.id, count: that.data.count }],
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
                    can: false
                  })
                  that.setData({
                    disable: false
                  })
                  wx.navigateTo({
                    // url: '../../pages/orderDetail2/orderDetail2?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
                    url: '../../pages/paysuccess/paysuccess?sku_idF=' + that.data.res2.id+"&count="+that.data.count,
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
                } else {
                  that.setData({
                    disable: false
                  })
                  wx.navigateTo({
                    url: '../../pages/payfail/payfail?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
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
              'fail': function (res) {
                console.log(res);
                that.setData({
                  "can": false
                })
                wx.showToast({
                  title: '支付失败',
                  image: '../../pages/images/fail.png',//自定义弹框图片
                  duration: 1500
                })
                that.setData({
                  disable: false
                })
                setTimeout(function () {
                  wx.hideToast()
                  wx.navigateTo({
                    url: '../../pages/payfail/payfail?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
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
                }, 1500)
              }
            })
          }
        }
      })
    }
    //正常商城支付接口
    function pay2(user_id){
      var datas = '';
      var discount_id ='';
      if (that.data.discount_id){
        discount_id = that.data.discount_id;
      }
      if (that.data.skujson) {
        datas = that.data.skujson;
      } else {
        datas = [{ sku_id: that.data.res2.id, count: that.data.count, cart_id: "" }];
      }
      wx.request({
        url: 'https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/moneyProductPrepay.do',
        // url: 'https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/moneyProductPrepay.do', //仅为示例，并非真实的接口地址
        data: {          //参数为json格式数据
          user_id: user_id,
          discount_id: discount_id,//优惠券
          address_id: that.data.address.id,
          is_kuaidi: that.data.types,//0为自提，1为快递
          detail: datas
        },
        header: {
          //设置参数内容类型为json
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          var res = res.data;
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
                    can: false
                  })
                  that.setData({
                    disable: false
                  })
                  wx.navigateTo({
                    // url: '../../pages/orderDetail2/orderDetail2?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
                    url: '../../pages/paysuccess/paysuccess?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
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
                } else {
                  that.setData({
                    disable: false
                  })
                  wx.navigateTo({
                    url: '../../pages/payfail/payfail?sku_idF=' + that.data.res2.id + "&count=" + that.data.count,
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
              'fail': function (res) {
                console.log(res);
                that.setData({
                  "can": false
                })
                // wx.showToast({
                //   title: '支付失败',
                //   image: '../../pages/images/fail.png',//自定义弹框图片
                //   duration: 1500
                // })
                that.setData({
                  disable: false
                })
                setTimeout(function () {
                  wx.hideToast()
                  wx.navigateTo({
                    url: '../../pages/payfail/payfail?sku_idF=' + '' + "&count=" + '',
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
                }, 1500)
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
      var that=this;
      if(that.data.mydata){
        that.setData({
          address:that.data.mydata
        })
      }
      if (that.data.discount_id) {
        console.log(that.data.discount_id);
        that.setData({
          discount_id: that.data.discount_id
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
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    if (e.currentTarget.dataset.click == 0) {//送货方式
      that.setData({
        hui: false
      })
      that.setData({
        heprice: that.data.heprice
      })
    } else {//优惠券
      console.log(that.data.types);
      that.setData({
        hui: true
      })
      var price = that.data.allprice;
      var newheprice = Number(that.data.heprice)+10;
      var oldheprice = that.data.heprice;
      if(Number(that.data.types)==0){
        that.setData({
          songType:"到店自取",
          yunfei:"0"
        })
        that.setData({
          heprice: oldheprice
        })
        console.log(that.data.heprice);
      }else{
        that.setData({
          songType: "快递（10元）",
          yunfei: "10.00"
        })
        that.setData({
          heprice: newheprice
        })
      }

    }
  },
  powerDrawer2: function (e) {
    var currentStatu2 = e.currentTarget.dataset.statu;
    this.util(currentStatu2)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  util2: function (currentStatu2) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData2: animation.export()
    })
    this.setData({
      animationData2: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu2 == "close") {
        this.setData(
          {
            showModalStatus2: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu2 == "open") {
      this.setData(
        {
          showModalStatus2: true
        }
      );
    }
  },
  toAdd: function () {
    wx.navigateTo({
      url: '../../pages/bianjidizhi/bianjidizhi?jftj='+"积分编辑",
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