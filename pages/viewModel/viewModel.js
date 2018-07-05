Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id: options.id//汽车id
    })  

    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/car/getCar.do?car_id='+that.data.id,
      // data: { 'car_id': that.data.id },
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //汽车id car_id 汽车名称 car_name 汽车图片 img_url 排序序号 sort 添加日期 add—_date
        //汽车最高价格 max_price 最低价格 min_price 车型数量 car_type_count
        var res = JSON.parse(res.data);
        console.log(res)
        that.setData({
          titleMsg: res,
           car_id:res.car_id,
           id:res.id
          // zc_price:res.min_price+"-"+res.max_price
        })
        wx.request({
          url: 'https://maxbeijing.mxlgsl.cn/Miao/car/getCarTypes.do?car_id=' + res.car_id,
          // data: { car_id: that.data.id },
          method: "POST",
          dataType: "JSON",
          header: { 'content-type': 'application/json' }, // 默认值
          success: function (res) {
            var res = JSON.parse(res.data);
            console.log(res);
            //汽车id car_id 所属汽车id car_id 车型名称 type_name 本店价格 bendian_price
            //指导价格 zhidao_price 排序序号 sort 汽车名称car_name 车辆配置描述图片 description_img
            
            for(var i=0;i<res.length;i++){
              res[i].youhui = (res[i].zhidao_price - res[i].bendian_price).toFixed(2);
            }
            that.setData({
              carType: res
            })
          }
        })
      }
    });
    //2.3
  },
  xunjia:function(e){
    var type_id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;
    var carname = e.currentTarget.dataset.carname;
    var zhidao = e.currentTarget.dataset.zhidao;
    console.log(zhidao);
    //userId为全局变量
    var user_Id = '';
    console.log(carname);
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        user_Id: user_Id
      },
    })
    wx.navigateTo({//:user_id(Integer),type_id(Integer)
      url: '../../pages/askPrice/askPrice?user_id=' + this.data.user_Id + "&type_id=" + type_id + "&src=" + src + "&carname=" + carname+"&zhidao="+zhidao,
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
  toDetail:function(e){
    var car_id = e.currentTarget.dataset.car_id;
    var id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;
    var zhidao = e.currentTarget.dataset.zhidao;
    var carname = e.currentTarget.dataset.carname;

    wx.navigateTo({//:user_id(Integer),type_id(Integer)
      url: '../../pages/modelDetails/modelDetails?id=' + id + "&src=" + src + "&id=" + id + "&zhidao=" + zhidao + "&carname=" + carname,
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
  shijia: function (e) {
    var type_id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;
    var carname = e.currentTarget.dataset.carname;
    
    var zhidao = e.currentTarget.dataset.zhidao;
    //user_id需要掉登录存储 
    var user_Id = "1111";
    wx.navigateTo({//:user_id(Integer),type_id(Integer)
      url: '../../pages/tryDrive/tryDrive?user_id=' + user_Id + "&type_id=" + type_id + "&src=" + src + "&carname=" + carname + "&zhidao=" + zhidao,
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