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
    duration: 1000,
    circular: true,
    current: 0,
    user_id:""
  },
  onLoad: function (options){
    console.log(options.id);
    console.log(options.car_id);
    var zhidao=options.zhidao;
    var carname = options.carname;

    var car_id='';
    var that=this;
    // if (options.type) {
    //   that.setData({
    //     car_id: options.type
    //   })
    //   car_id = options.type;
    // }else{
    //   that.setData({
    //     car_id: options.car_id
    //   })  
    //   car_id = options.car_id;
    // }
         that.setData({
        id: options.id
      })  
    that.setData({
      src: options.src
    })  
    that.setData({
      zhidao: options.zhidao
    })  
    that.setData({
      carname: carname
    });
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id:res.data
        })
      },
    })
    wx.getStorage({
      key: 'salesman_phone',
      success: function(res) {
        console.log(res.data);
      },
    })
    var car_id=options.car_id;
    that.setData({
      id:options.id
    });
    var id=options.id;
  //   wx.request({
  //     url:'https://maxbeijing.mxlgsl.cn/Miao/car/getCar.do?car_id='+that.data.car_id,
  //  // data: { id: this.data.car_id},
  //   method:"POST",
  //   dataType:"JSON",
  //   header: {'content-type': 'application/json'}, // 默认值
  //   success: function(res) {
  //       console.log(JSON.parse(res.data));
  //       //汽车id car_id 所属汽车id car_id 车型名称 type_name 本店价格 bendian_price
  //       //指导价格 zhidao_price 排序序号 sort 汽车名称car_name 车辆配置描述图片 description_img
  //       that.setData({
  //         carDetail: JSON.parse(res.data)
  //       })
  //       that.setData({
  //         pz: that.data.img_url
  //       })
  //       console.log(that.data.carDetail);

  //     }
  //   })

    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/car/getCarType.do?id=' + that.data.id,
      // data: { id: this.data.car_id},
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
      
        var res=JSON.parse(res.data);
         console.log(res);
         var newres=res;
         
           newres.youhui = (newres.zhidao_price - newres.bendian_price).toFixed(2);
         
         console.log(newres);
        that.setData({
          carDetail: newres
        })
        
        that.setData({
          pz: that.data.carDetail.description_img
        })
        console.log(res.img_list);
        var imgUrl = [];
        for (var i = 0; i < res.img_list.length;i++) {
          imgUrl.push(res.img_list[i].img_url)
         
        }
        that.setData({
          imgUrls: imgUrl
        })
      }
    })
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
  shijia: function (e) {
    var type_id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;

    //user_id需要掉登录存储 
    var zhidao=this.data.zhidao;
    var carname = e.currentTarget.dataset.carname;

    wx.navigateTo({//:user_id(Integer),type_id(Integer)
      url: '../../pages/tryDrive/tryDrive?user_id=' + this.data.user_id + "&type_id=" + type_id + "&src=" + src + "&zhidao=" + zhidao + "&carname=" + carname,
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
  xunjia: function (e) {
    var type_id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;
    var zhidao= e.currentTarget.dataset.zhidao;
    var zhidao = this.data.zhidao;
    var carname = e.currentTarget.dataset.carname;
    //user_id需要掉登录存储 
    console.log(type_id);
    console.log(this.data.user_id);
    wx.navigateTo({//:user_id(Integer),type_id(Integer)
      url: '../../pages/askPrice/askPrice?user_id=' + this.data.user_id + "&type_id=" + type_id + "&src=" + src + "&zhidao=" + zhidao + "&carname=" + carname,
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

  }
})