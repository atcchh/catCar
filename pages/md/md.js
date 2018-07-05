Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    orientationList: [
      { id: "01", region: "A" },
      { id: "02", region: "B" },
      { id: "03", region: "C" },
      { id: "04", region: "D"},
      { id: "05", region: "E" },
      { id: "06", region: "F" },
      { id: "07", region: "G" },
      { id: "08", region: "H" },
      { id: "09", region: "I" },
      { id: "10", region: "J" },
      { id: "11", region: "K" },
      { id: "12", region: "L" },
      { id: "13", region: "M" },
      { id: "14", region: "N" },
      { id: "15", region: "O" },
      { id: "16", region: "P" },
      { id: "17", region: "Q" },
      { id: "18", region: "R" },
      { id: "19", region: "S" },
      { id: "20", region: "T" },
      { id: "21", region: "U" },
      { id: "22", region: "V" },
      { id: "23", region: "W" },
      { id: "24", region: "X" },
      { id: "25", region: "Y" },
      { id: "26", region: "Z" },

    ],
    act_addList: [
      {
        id: "01", region: "A",
        city: [
        //   { id: "0101", name: "阿斯顿马丁" },
        // { id: "0102", name: "阿尔法罗密欧" },
        ]
      },
      {
        id: "02", region: "B",
        city: [

        ]
      },
      {
        id: "03", region: "C",
        city: [
          // { id: "0303", name: "凯迪拉克" }
          ]
      },
      {
        id: "04", region: "D",
        city: [

        ]
      },
      { id: "05", region: "E", city: [
        // { id: "0501", name: "黑龙江市" }
        ] 
      },

      {
        id: "06", region: "F",
        city: [
          // { id: "0603", name: "福特" },
          // { id: "0604", name: "福田安阳市" },
        ]
      },
      {
        id: "07", region: "G",
        city: [
        //   { id: "0703", name: "高尔夫" },
        // { id: "0704", name: "高乐高" },
        // { id: "0401", name: "高加索" },
        // { id: "0407", name: "高尔基" },
        // { id: "0508", name: "高洁丝" },
        // { id: "0609", name: "高血压" }
        ]
      },{
        id: "08", region: "H",
        city: [

        ]
      }, {
        id: "09", region: "I",
        city: [

        ]
      }, {
        id: "10", region: "J",
        city: [

        ]
      }
      , {
        id: "11", region: "K",
        city: [

        ]
      }
      , {
        id: "12", region: "L",
        city: [

        ]
      }
      , {
        id: "13", region: "M",
        city: [

        ]
      }
      , {
        id: "14", region: "N",
        city: [

        ]
      }
      , {
        id: "15", region: "O",
        city: [

        ]
      }
      , {
        id: "16", region: "P",
        city: [

        ]
      }
      , {
        id: "17", region: "Q",
        city: [

        ]
      }
      , {
        id: "18", region: "R",
        city: [

        ]
      }
      , {
        id: "19", region: "S",
        city: [

        ]
      }
      , {
        id: "20", region: "T",
        city: [

        ]
      }
      , {
        id: "21", region: "U",
        city: [

        ]
      }
      , {
        id: "22", region: "V",
        city: [

        ]
      }
      , {
        id: "23", region: "W",
        city: [

        ]
      }
      , {
        id: "24", region: "X",
        city: [

        ]
      }
      , {
        id: "25", region: "Y",
        city: [

        ]
      }
      , {
        id: "26", region: "Z",
        city: [

        ]
      }
    ],
    toView: 'inToView01',
  },
  touchstart:function(e){
    console.log('start');
  },
  scrollToViewFn: function (e) {
    var _id = e.target.dataset.id;
    this.setData({
      toView: 'inToView' + _id
    })
    console.log(_id)

  },
  onLoad: function (options,e) {
    var that=this;
    var movieid = getApp().requestDetailid; 
    console.log(movieid);
    //获取车型列表
    wx.request({
      url: "https://maxbeijing.mxlgsl.cn/Miao/dijia/getCarBrands.do",//
      success: function (res) {
        console.log(res.data);
        var res=res.data;
        var act_addList = that.data.act_addList;
        for (var k in act_addList) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].first == act_addList[k].region) {
              act_addList[k].city.push({
                name: res[i].brand_name,
                id: res[i].id,
                img_url: res[i].img_url
              });
            }
          }
        }
        console.log(act_addList);
        that.setData({
          act_addList: act_addList
        })
      }
    })

    
    // var res=[
    //   {brand_name:"法拉利",first:"F",img_url:"",id:"1"},
    //   { brand_name: "奔驰", first: "B", img_url: "", id: "2"},
    //   { brand_name: "奥迪", first: "A", img_url: "", id: "3"},
    // ];
   


  },
  toPay:function(e){
    var car_brand = e.currentTarget.dataset.carbrand;
    //console.log(car_brand);

    // wx.navigateTo({
    //   url: '../../pages/diPay/diPay?carBrand='+car_brand,
    //   success: function (res) {
    //     // success
    //   },
    //   fail: function (res) {
    //     // fail

    //   },
    //   complete: function (res) {
    //     // complete
    //   }
    // })
    

    var pages = getCurrentPages();

    var currPage = pages[pages.length - 1];
    //当前页面
    var prevPage = pages[pages.length - 2];
    //上一个页面


    // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    prevPage.setData({
      'car_brand': car_brand
    })

    wx.navigateBack({
      delta: 1
    })


  }
})  