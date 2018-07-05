Page({
  data: {
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    indicatorColor: "#fff",
    indicatorActiveColor: "#fff",
    autoplay: true,
    interval: 3500,
    duration: 500,
    circular: true,
    current: 0,
    user_id:"",
    showModalStatus: false,
    counts:1,
    able1:true,
    xiaotu:''
  },
  onLoad: function (options){
    console.log(options.id);
    console.log(options.car_id);
    var zhidao=options.zhidao;
    var carname = options.carname;

    var that=this;

    that.setData({
        id: options.id
      })  

    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id:res.data
        })
      },
    })
    var id=options.id;
    //商品详情
    
  
    wx.request({ //查询商品
      //url: "http://1977644bu3.iask.in/Miao/moneyProduct/getMoneyProduct.do?id=" + options.id,
      url: "https://maxbeijing.mxlgsl.cn/Miao//moneyProduct/getMoneyProduct.do?id=" + options.id,
      success: function (res) {
        var res = res.data;
        console.log(res);

        // that.setData({
        //   detail: res
        // })
        wx.setNavigationBarTitle({
          title: res.name
        })
        // that.setData({
        //   imgUrls: res.lunbos
        // })
        that.setData({
          detail: res,
          pz: res.description,
          imgUrls: res.lunbos,
          allprice: res.price,
          xiaotu: res.img_url_small
        })
        // that.setData({
        //   xiaotu: res.img_url_small
        // })
        
        var colorList = res.colorObjs;
        var sizeObjs = res.sizeObjs;

        for (var i = 0; i < colorList.length; i++) {
          colorList[i].select = "";

        }
        for (var i = 0; i < sizeObjs.length; i++) {
          sizeObjs[i].select2 = "";

        }
        that.setData({
          colorObjs: res.colorObjs
        })
        that.setData({
          sizeObjs: res.sizeObjs
        })

      }
    })

    
    // wx.request({  //
    //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/getMoneySku.do?product_id="+ 2+"&color_id="+"5"+"&size_id="+"4",
    //   success: function (res) {
    //     //stock==库存
    //     var res = res.data;
    //     console.log(res);
    //   }
    // })
    //添加购物车
    // wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
    //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/addCart.do?user_id=" + 114 + "&product_id=" + 2 + "&color_id=" + 5 + "&size_id=" + 4 + "&count=" + 10,
    //   success: function (res) {
    //     //添加购物车
    //     var res = res.data;
    //     console.log(res);

    //   }
    // })

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
    console.log(e);
    wx.request({
      url: '',
    })
  },
  tel:function(e){
    // wx.getStorage({
    //   key: 'salesman_phone',
    //   success: function(res) {
    //     call(res.data)
    //   },
    // })
    var salesman_phone = wx.getStorageSync('salesman_phone') || '‭‭0574-87670555';
    call(salesman_phone);
    function call(phone){
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function (res) {
          console.log('拨打成功');
        }
      })
    }
  },
  gouwuche: function (e) {
    console.log(1);
    //两个按钮事件
  },
  biuy:function (e){
    console.log(3);
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var that=this;
    that.util(currentStatu)
    that.setData({
      cart: e.currentTarget.dataset.car
    })
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
  //969696
  countClose: function (e) {
    var that = this;
    var counts=that.data.counts;
    if(that.data.counts==2){
      that.setData({
        counts:1,
        able1:true,
        allprice: that.data.detail.price,
      })
    }else{
      console.log('lucy');
      that.setData({
        counts: counts-1,
        allprice: (((that.data.detail.price) * 100) * (counts-1)) / 100,
      })
    }
    console.log(that.data.counts);
  },
  countAdd:function(e){
    var that = this;
    var num = that.data.counts + 1;
    console.log(num);
      that.setData({
        counts: num,
        allprice: (((that.data.detail.price) * 100)*num)/100,
      })
      that.setData({
        able1: false
      })
  },
  changeColor: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;

    //colorObjs: res.colorObjs
    var colorObjs = that.data.colorObjs;
    for (var i = 0; i < colorObjs.length; i++) {
      if (colorObjs[i].id == id) {
        console.log(colorObjs[i].select);
        if (colorObjs[i].select == "") {
          colorObjs[i].select = "background:#F65B4E;border:0;color:#fff;";
        } else {
          colorObjs[i].select = "";
        }
      } else {
        colorObjs[i].select = "";
      }

    }
    that.setData({
      colorObjs: colorObjs
    })
    that.setData({
      color_id:id
    })
    console.log(colorObjs);
    if (that.data.size_id) {
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySku.do?product_id=" + that.data.id + "&color_id=" + id + "&size_id=" + that.data.size_id,//获取所有商品(积分商城)
        success: function (res) {
          var res = res.data;
          console.log(res);

          //id为 sku_id points point_price
          if (res.id) {
            //根据sku_id查询 库存
            wx.request({
              //https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=6
              url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=" + res.id,
              success: function (res) {
                var res2 = res.data;
                console.log(res2);
                that.setData({
                  stock: res2.stock
                })
              }
            })
          }
        },
      })
    }
  },
  changeSize: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    //sizeObjs: res.sizeObjs
    var sizeObjs = that.data.sizeObjs;
    for (var i = 0; i < sizeObjs.length; i++) {
      if (sizeObjs[i].id == id) {
        console.log(sizeObjs[i].select2 == "");
        if (sizeObjs[i].select2 == "") {
          sizeObjs[i].select2 = "background:#F65B4E;border:0;color:#fff;";
        } else {
          sizeObjs[i].select2 = "";
        }
      } else {
        sizeObjs[i].select2 = "";
      }
    }

    that.setData({
      sizeObjs: sizeObjs
    })
    console.log(sizeObjs);
    // 更新库存
    that.setData({
      size_id: id
    })
    if (that.data.color_id) {
      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySku.do?product_id=" + that.data.id + "&color_id=" + that.data.color_id + "&size_id=" + id,//获取所有商品(积分商城)
        success: function (res) {
          var res = res.data;
          console.log(res);

          //id为 sku_id points point_price
          if (res.id) {
            //根据sku_id查询 库存
            wx.request({
              //https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=6
              url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=" + res.id,
              success: function (res) {
                var res2 = res.data;
                console.log(res2);
                that.setData({
                  stock: res2.stock
                })
              }
            })
          }
        },
      })
    }
  },
  buy: function (e) {
    //getProduct
    var that = this;
    //获取sku_id
    var id = that.data.id;

    var color_id = "";
    var size_id = "";
    var sizeObjs = that.data.sizeObjs;
    for (var i = 0; i < sizeObjs.length; i++) {
      if (sizeObjs[i].select2) {
        size_id = sizeObjs[i].id;
      }
    }

    //colorObjs: res.colorObjs
    var colorObjs = that.data.colorObjs;
    for (var i = 0; i < colorObjs.length; i++) {
      console.log(colorObjs[i].select);
      if (colorObjs[i].select) {
        color_id = colorObjs[i].id;
      }
    }
    if (!color_id) {
      wx.showToast({
        title: '请选择产品颜色',
        duration: 2000
      });
      return false;
  }
    if (!size_id) {
        wx.showToast({
          title: '请选择产品规格',
          duration: 2000
        });
        return false;
    }
    that.setData({
      subDisabled: true
    })
    if (that.data.cart == "1") {
      //购物车
      wx.getStorage({
        key: 'user_id',
        success: function(res) {
          addCart(res.data);
        },
      })
      console.log(that.data.counts);
      function addCart(user_id) {
        console.log(that.data.counts);
        wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
          url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/addCart.do?user_id=" + user_id + "&product_id=" + that.data.id + "&color_id=" + color_id + "&size_id=" + size_id + "&count=" + that.data.counts,
          success: function (res) {
            //添加购物车
            var res = res.data;
            console.log(res);

          }
        })
        that.setData({
          subDisabled: false,
          showModalStatus: false
        });
        wx.showToast({
          title: '已在购物车等你哦',
          icon: "success",
          duration: 2000
        })
        setTimeout(function () {
          wx.hideToast();

        }, 2000)

      }
    } else if (false == true) {
      //购物车转入结算
    } else {
      //直接支付
      that.setData({
        subDisabled: false
      })

      wx.request({
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySku.do?product_id=" + id + "&color_id=" + color_id + "&size_id=" + size_id,//获取所有商品(积分商城)
        success: function (res) {
          var res = res.data;
          console.log(res);

          //id为 sku_id points point_price
          if (res.id) {
            //根据sku_id查询 库存
            wx.request({
              //https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=6
              url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getMoneySkuById.do?id=" + res.id,
              success: function (res) {
                var res2 = res.data;
                console.log(res2);
                that.setData({
                  stock: res2.stock
                })
                wx.navigateTo({
                  url: '../../pages/querenOrder2/querenOrder2?sku_id=' + res2.id + "&count=" + that.data.counts + "&des=" + that.data.detail.img_url + "&point=" + 0 + "&allprice=" + that.data.detail.price + "&heprice=" + (((that.data.detail.price) * 100) * that.data.counts)/100+"&froms="+"money",
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

            
          }
        },
      })
    }




    //支付 sku_id count

  },
  bcar:function(e){
       wx.navigateTo({
          url: '../../pages/gouwuche/gouwuche',
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