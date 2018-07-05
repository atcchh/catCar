Page({
  data: {
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    indicatorActiveColor: "#fff",
    indicatorColor: "#fff",
    indicatorDots: true,
    current: 0,
    user_id:"",
    counts:1,
    able1:true,
    ableColor: "border:1px solid #969696;border-right:0;",
    shouUrl: '../images/starGray.png',
    show:0
  },
  onLoad: function (options){
    var that = this;
    var name = options.name;
    var des=options.des;
    that.setData({
      point:options.point,
      des:des
    });
    
    wx.setNavigationBarTitle({
      title: name
    })
    that.setData({//商品id
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
    that.setData({
      id:id
    })

    wx.request({
      //https://maxbeijing.mxlgsl.cn/Miao
     // url: "https://maxbeijing.mxlgsl.cn/Miao/product/getProduct.do?id=" +id,//获取对应id的商品(积分商城)
      url: "https://maxbeijing.mxlgsl.cn/Miao/product/getProduct.do?id=" + id,//获取对应id的商品(积分商城)
      success: function (res) {
        var res = res.data;

        that.setData({
          spDetailJf:res
        })
        console.log(that.data.spDetailJf);
        that.setData({
          imgUrls:res.lunbos
        })
        that.setData({
          pz: res.description
        })
        var colorList = res.colorObjs;
        var sizeObjs = res.sizeObjs;
        for (var i = 0; i < colorList.length;i++){
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
        var allprice = (((that.data.spDetailJf.point_price) * 100) * (that.data.counts * 100)) / 10000;
        console.log(allprice);
        that.setData({
          allprice: allprice
        })
      } 
    })
    
    // // wx.request({  //
    // //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/getMoneySku.do?product_id="+ 2+"&color_id="+"5"+"&size_id="+"4",
    // //   success: function (res) {
    // //     //stock==库存
    // //     var res = res.data;
    // //     console.log(res);
    // //   }
    // // })
    // //添加购物车
    // wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
    //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/addCart.do?user_id=" + 114 + "&product_id=" + 2 + "&color_id=" + 5 + "&size_id=" + 4 + "&count=" + 10,
    //   success: function (res) {
    //     //添加购物车
    //     var res = res.data;
    //     console.log(res);

    //   }
    // })
    // wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
    //   url: "http://1977644bu3.iask.in/Miao/moneyProduct/addCart.do?user_id=" + 114 + "&product_id=" + 1 + "&color_id=" + 2 + "&size_id=" + 1 + "&count=" + 120 ,
    //   success: function (res) {
    //     //添加购物车
    //     var res = res.data;
    //     console.log(res);

    //   }
    // })
  },
  shoucang:function(e){
    var that=this;
    var shou=that.data.show;
    if(shou==0){
      
      that.setData({
        show:1,
        shouUrl: '../images/star.png'
      });
    }else{
      
      that.setData({
        show:0,
        shouUrl:'../images/starGray.png'
      });
    }
  },
  buy: function (e) {
    //getProduct
    var that = this;
    //获取sku_id
    var id=that.data.id;
    
    var color_id="";
    var size_id="";

    var sizeObjs = that.data.sizeObjs;
    for (var i = 0; i < sizeObjs.length; i++) {
        if (sizeObjs[i].select2) {
          size_id= sizeObjs[i].id;
        } 
    }

    //colorObjs: res.colorObjs
    var colorObjs = that.data.colorObjs;
    for (var i = 0; i < colorObjs.length; i++) {
        console.log(colorObjs[i].select);
        if (colorObjs[i].select) {
          color_id=colorObjs[i].id;
        }
    }
    that.setData({
      subDisabled: true
    })
    wx.request({
     // https://maxbeijing.mxlgsl.cn/Miao
      url: "https://maxbeijing.mxlgsl.cn/Miao/product/getSku.do?product_id=" + id + "&color_id=" + color_id + "&size_id=" + size_id,//获取所有商品(积分商城)
      success: function (res) {
        var res = res.data;
        console.log(res);
        that.setData({
          subDisabled: false
        })
        //id为 sku_id points point_price
        if (res.id) {
          //根据sku_id查询 库存
          wx.request({
            //https://maxbeijing.mxlgsl.cn/Miao
            url: "https://maxbeijing.mxlgsl.cn/Miao/product/getSkuById.do?id=" + res.id,
            success: function (res) {
              var res2 = res.data;
              console.log(res2);

                that.setData({
                  stock: res2.stock
                })

                wx.navigateTo({
                  url: '../../pages/querenOrder2/querenOrder2?sku_id=' + res2.id + "&count=" + that.data.counts + "&des=" + that.data.des + "&point=" + that.data.point + "&allprice=" + that.data.allprice + "&heprice=" + (((that.data.allprice) * 100) * that.data.counts) / 100,
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


    //支付 sku_id count

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
    this.util(currentStatu)
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
  countClose:function (e){
      var that=this;
      if (that.data.counts == 2){
        that.setData({
          counts: 1
        })
        that.setData({
          ableColor: "border:1px solid #969696;"
        })
        that.setData({
          able1: true
        })
      }else if (that.data.counts==1){
        that.setData({
          counts:1
        })
        that.setData({
          ableColor:"border:1px solid #969696;"
        })
        that.setData({
          able1:true
        })
        that.setData({
          allprice: that.data.spDetailJf.point_price
        })
      }else{
        var num = that.data.counts - 1;
        that.setData({
          counts: num
        })
        that.setData({
          ableColor: ""
        })
        var allprice = (((that.data.spDetailJf.point_price) * 100) * (that.data.counts * 100)) / 10000;
        console.log(allprice);
        that.setData({
          allprice: allprice
        })
      }
  },
  countAdd:function(e){
    var that = this;
    var num = that.data.counts + 1;
    console.log(that.data.counts);
      that.setData({
        counts: num
      })
      that.setData({
        able1: false
      })
      that.setData({
        ableColor: ""
      })
      var allprice = (((that.data.spDetailJf.point_price) * 100) * (that.data.counts*100))/10000;
      console.log(allprice);
      that.setData({
        allprice: allprice
      })
  },
  changeColor:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    
    //colorObjs: res.colorObjs
    var colorObjs = that.data.colorObjs;
    for (var i = 0; i < colorObjs.length; i++) {
      if (colorObjs[i].id == id){
        console.log(colorObjs[i].select);
        if (colorObjs[i].select==""){
          colorObjs[i].select = "background:#F65B4E;border:0;color:#fff;";
        }else{
          colorObjs[i].select = "";
        }
      }else{
        colorObjs[i].select="";
      }

    }
    that.setData({
      colorObjs: colorObjs
    })
    console.log(colorObjs);
  },
  changeSize:function(e){
    var that=this;
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
  }
})