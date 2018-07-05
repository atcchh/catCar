Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    url:[
        "http://www.baidu.com",
        "http://www.google.com",
        "http://www.csdn.net"
    ],
    indicatorDots: true,
    indicatorColor:"#fff",
    indicatorActiveColor:"#fff",
    autoplay: true,
    interval: 1500,
    duration: 1000,
    circular:true,
    current: 0,
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
  onLoad:function(options){ 
    wx.request({
      url: 'http://项目地址/news/getNews.action',
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
        this.setData({
          zixun:res
        })
      }
    })
  },
  toPeijian:function(e){
    wx.navigateTo({
      url: '../../pages/peijian/peijian',
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
  toReg: function (e) {
    wx.navigateTo({
      url: '../../pages/peijian/peijian',
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
  changePage:function(e){
    var url = e.currentTarget.dataset.url;
    wx.switchTab({
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
  },
  seeContent:function(e){//查看资讯详情
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://项目地址/news/getNew.action',
      data: { news_id: id},
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
      }
    })
  }
})