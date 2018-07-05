Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeGuwen:"border:4rpx solid #34A4E4;",
    imgSrc:"../images/jiantou_down.png",
    imgSrc2:"../images/jiantou_up.png",
    show:false,
    curName:"",
    abled:false,
    abled2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //还需要用户手机号
    var that=this;
    var mendian='';
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({
          phone: res.data
        })

      },
    })

    wx.getStorage({
      key: 'modelsId',
      success: function (res) {
        //modelsId=res.data;
        that.setData({
          modelsId: res.data
        })
      }
    })
    wx.getStorage({
      key: 'user_name',
      success: function (res) {
        that.setData({
          userName: res.data
        })

      },
    })

    wx.getStorage({
      key: 'sex',
      success: function (res) {
        that.setData({
          sex: res.data
        })

      },
    })
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/getShops.do',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //门店id 门店名称shop_name 图片地址img_url 排列序号sort 添加时间add_date
        mendian=JSON.parse(res.data)
        var arr = JSON.parse(res.data);
        console.log(mendian);
        for(var i=0;i<arr.length;i++){
          arr[i].show1='';
          arr[i].imgSrc="../images/jiantou_down.png";
          var c = arr[i].salesmans;
          for(var k in c){
            c[k].selected='';
            c[k].border = '';
          }
        }
        that.setData({
          mendian: arr
        })
      }
    })
  },
  showGuwen:function(e){
    var show1 = e.currentTarget.dataset.id
    console.log(show1);
    var arr=this.data.mendian;
    for(var i=0;i<arr.length;i++){
      if(show1==arr[i].id){
        if (arr[i].show1!=true){
          arr[i].show1 = true;
          arr[i].imgSrc = "../images/jiantou_up.png";
        }else{  
          arr[i].show1 = "";
          arr[i].imgSrc = "../images/jiantou_down.png";
        } 
        
      }else{
        arr[i].show1 = "";
        arr[i].imgSrc = "../images/jiantou_down.png";
      }
    }
    this.setData({
      mendian:arr
    })
  },
  choseCur:function(e){
    //var that=this;
    this.setData({
      salesManId: e.currentTarget.dataset.id
    })

    this.setData({
      salesManName: e.currentTarget.dataset.name
    })
    var shop_id = e.currentTarget.dataset.id;
    var  forId = e.currentTarget.dataset.shop_id;
    console.log(e.currentTarget.dataset.id);
    var arr=this.data.mendian;
    for(var i=0;i<arr.length;i++){
      var c = arr[i].salesmans;
      if(forId!=arr[i].id){
        for (var k in c) {
          c[k].selected = "";
          c[k].border = '';
        } 
      }else{
        for (var k in c) {
          if (shop_id == c[k].id) {
            if (c[k].selected == "") {
              c[k].selected = true;
              c[k].border = 'border:2px solid #34A4E4';
              this.setData({
                  curId:c[k].id
              })
            } else {
              c[k].selected = "";
              c[k].border = '';
            }
          } else {
            c[k].selected = "";
            c[k].border = '';
          }
        }   
      }
    }
    this.setData({
      mendian: arr
    })

  },
  sub:function(e){
    var that=this;
    that.setData({
      abled: true
    })
    var salesManId="";
    var saleName="";
    var arr=that.data.mendian;
    for(var i=0;i<arr.length;i++){
      var c = arr[i].salesmans;
      for (var k in c){
        if (c[k].selected==true){
          console.log(c[k]);
          salesManId = c[k].id;
          saleName=c[k].name;
          console.log(salesManId);
          console.log(c[k].name);
          wx.setStorage({
            key: 'salesManName',
            data: saleName,
          })
          break;
        }else{
          
          saleName="";
          
        }
      }
    }

   // console.log(salesManId);

    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/doRegister.do?phone=' + that.data.phone + "&user_name=" + that.data.userName + "&salesManId=" + salesManId,

      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
      
        if (res.data==1) {//成功
          wx.showToast({
            title: '选择成功',
            icon: "success",
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
          wx.redirectTo({
            url: '../../pages/doneReg/doneReg',
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
        } else {//==0失败
          wx.showToast({
            title: '选择失败',
            image: '../../pages/images/fail.png',//自定义弹框图片
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1500)
          wx.redirectTo({
            url: '../../pages/login/login',
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
  },


  tiaoguo: function (e) {
    var that = this;
    that.setData({
      abled2: true
    })
    wx.setStorage({
      key: 'salesManName',
      data: "",
    })
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/doRegister.do?phone=' + that.data.phone + "&user_name=" + that.data.userName,
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        console.log(res);
        if (res.data == 1) {//成功
          // that.setData({
          //   abled2: false
          // });
          wx.showToast({
            title: '选择成功',
            icon: "success",
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1500)
          wx.redirectTo({
            url: '../../pages/doneReg/doneReg',
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
        } else {//==0失败
          wx.showToast({
            title: '选择失败',
            image: '../../pages/images/fail.png',//自定义弹框图片
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1000)
          wx.redirectTo({
            url: '../../pages/login/login',
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