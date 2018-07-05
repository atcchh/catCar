Page({

  /**
   * 页面的初始数据
   */
  data: {
    char_lt: "<",
    char_rt: ">",
    active21:"active",
    active22: "",
    active23: "",
    active31: "active",
    active32: "",
    active33: "",
    active41:"active",
    active42:"",
    active11:"active",
    active12: "",
    active13: "",
    active14: "",
    yusuan:"",
    yongtu:"",
    time:"",
    user:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var btn = [];
    var newSelectTitle = [];
    var selectTitle=[];
    wx.request({
      url: 'https://maxbeijing.mxlgsl.cn/Miao/user/getModelTypes.do',//加载新手标签标题
      method: "POST",
      dataType: "JSON",
      header: { 'content-type': 'application/json' }, // 默认值
      success: function (res) {
        //咨询id id 咨询标题 title 标题图片 img_url 内容 content 添加时间add_date
        //排列序号 sort
        var arr=[];
        selectTitle = JSON.parse(res.data);
        arr=selectTitle;
        for(var i=0;i<arr.length;i++){
          var c=arr[i].model_list;
          console.log(c);
          for(var key in c){
            console.log(c[key])
            c[key].active="";
          }
        }

        //购车意愿选择条件的标题
        //console.log(that.data.selectTitle);
        that.setData({
          selectTitle: arr
        })
        
        console.log(that.data.selectTitle);
      }
    })
  },

  //提交 
  sub:function(){

    var arr=this.data.selectTitle;
    var modelsId='';
    for(var i=0;i<arr.length;i++){
      var c=arr[i].model_list;
      for(var k in c){
         if(c[k].active!=""){
           modelsId+=c[k].model_id+","
         }
      }
    }
    //console.log(modelsId);
    modelsId=modelsId.substring(0,modelsId.length-1);
    console.log(modelsId);
    if (true){
      wx.setStorage({
        key: 'modelsId',
        data: modelsId,
        success: function () {
          wx.redirectTo({
            url: '../../pages/choseGuwen/choseGuwen',
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
    }else{
      wx.showToast({
        title: '验证失败',
        image: '../../pages/images/fail.png',//自定义弹框图片
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }

  },
  selectType:function(e){
      //  color:#fff !important;background: #F55A53; border-color:#F55A53 !important;
    var type_id = e.currentTarget.dataset.type_id;
    var model_id = e.currentTarget.dataset.model_id;
    var newSelectTitle=this.data.selectTitle;
    //console.log(newSelectTitle);
    for (var i = 0; i <newSelectTitle.length;i++){
      var c=newSelectTitle[i].model_list;
      if (type_id == newSelectTitle[i].id){

          for(var k in c){
            if (model_id == c[k].model_id){
              if (c[k].active == "") {
                c[k].active = "color:#fff !important;background: #F55A53; border-color:#F55A53 !important;";
              } else {
                c[k].active = "";
              }
            }else{
              c[k].active = "";
            }

          }
        }
    }
    this.setData({
      selectTitle:newSelectTitle
    })
    
  }
})