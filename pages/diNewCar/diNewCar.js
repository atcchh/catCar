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
    var that = this;
    wx.request({//获取所有汽车列表
      //url: 'https://maxbeijing.mxlgsl.cn/Miao/car/getCars.do',
      url: 'https://maxbeijing.mxlgsl.cn/Miao/car/getCarBrands.do',
      data: {},
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        var res = JSON.parse(res.data);
        console.log(res);
        that.setData({
          carList: res
        })
      }
    })
  },
  toDetail: function (e) {

    var id = e.currentTarget.dataset.car_id;
    console.log(id);
    wx.navigateTo({
      url: '../../pages/viewModel/viewModel?id=' + id,
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
  changePages: function (e) {
    var url = e.currentTarget.dataset.url;

    wx.redirectTo({
      url: url,
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