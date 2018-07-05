// pages/gouwuche/gouwuche.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kong:false,
    counts: 1,
    ableColor: "border:1px solid #969696;",
    state:"去支付",
    allsel:"",
    bianji:"编辑",
    dis: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var user_id='';
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
         var  user_id=res.data;
        searchSp(user_id);
      },
    })
    function searchSp(user_id){
      //查找购物车中的商品
      var arr = [];var res =[];
      wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
      //http://1977644bu3.iask.in/Miao
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getCarts.do?user_id="+user_id,
        success: function (res) {
          //添加购物车
          res = res.data;
          console.log(res);
          var reslucy=res.data;
          var allprice = 0;
          for(var i=0;i<res.length;i++){
            res[i].select="";
            res[i].able1=true;
            res[i].ableColor ="border:1px solid #969696;border-right:0;";
            if (res[i].count > 1) {
              res[i].able1 = false;
              res[i].ableColor = '';
            }
            allprice += (res[i].price*res[i].count)*100,
            res[i].cart_id=res[i].id
          }
          that.setData({
            cart:res,
            allprice: allprice/100
          });
        }
      })
      
      
    }
    ///购物车结算
  },

  deleteCart:function(e){

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  select2:function(e){
    var  that=this;
    var id = e.currentTarget.dataset.id;
    var res=that.data.cart;
    var allcounts = 0;
    for(var i=0;i<res.length;i++){
      if(res[i].id==id){
        if(res[i].select==""){
          res[i].select ="../images/se_red.png";
        }else{
          res[i].select = "";
          that.setData({
            allsel: ''
          })
        }
      }
      if (res[i].select) {
        allcounts += 1;
      }
    }
    console.log(allcounts);
    if(allcounts == res.length){
      that.setData({
        allsel:'../images/se_red.png'
      })
    }
    that.setData({
      cart:res
    })
  },
  allsels: function (e) {//../images/se_red.png
    var that=this;
    var res=that.data.cart;
    var allsel = e.currentTarget.dataset.see;
    if (allsel == "") {
      for (var i = 0; i < res.length; i++) {
        res[i].select = "../images/se_red.png"
      }
        that.setData({
          imgs: "../images/se_red.png"
        })
        that.setData({
          allsel: "../images/se_red.png"
        })
        that.setData({
          cart: res
        })
    }else{
      for (var i = 0; i < res.length; i++) {
        res[i].select = "";
      }
      that.setData({
        imgs: ""
      })
      that.setData({
        allsel: ""
      })
    }
    

    that.setData({
      cart: res
    })
  },
  countClose: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var user_id = e.currentTarget.dataset.user;
    var product_id = e.currentTarget.dataset.pid;
    var color_id = e.currentTarget.dataset.color;
    var count = e.currentTarget.dataset.count;
    var size_id = e.currentTarget.dataset.size;
    // data-pid='{{item.product_id}}' data-color='{{item.color_id}}' data-size='{{item.size_id}}' data-count='{{item.count}}' data-id="{{item.id}}" data-user='{{item.user_id}}
    wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/deleteCarts.do?id=" + id,
      success: function (res) {
        //删除购物车商品
      }
    })
    wx.request({  //添加购物车
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/addCart.do?user_id=" + user_id + "&product_id=" + product_id + "&color_id=" + color_id + "&size_id=" + size_id + "&count=" + (count - 1),
      success: function (res) {
        //添加购物车
        console.log(res);
        getCart();
      }
    })
    function getCart() {
      wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
        //http://1977644bu3.iask.in/Miao
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getCarts.do?user_id=" + user_id,
        success: function (res) {
          //添加购物车
          res = res.data;
          console.log(res);
          var reslucy = res.data;
          var allprice = 0;
          for (var i = 0; i < res.length; i++) {
            res[i].select = "";
            res[i].able1 = true;
            res[i].ableColor = "border:1px solid #969696;border-right:0;";
            if (res[i].count > 1) {
              res[i].able1 = false;
              res[i].ableColor = '';
            }
            allprice += (res[i].price * res[i].count) * 100,
              res[i].cart_id = res[i].id
          }
          that.setData({
            cart: res,
            allprice: allprice / 100
          });
        }
      })
    };
    var id = e.currentTarget.dataset.id;
    var res=that.data.cart;
    for(var i=0;i<res.length;i++){
        if(res[i].id==id){
          console.log(res[i].count)
          if(res[i].count==1){
            res[i].count = 1;
            res[i].able1=true
            res[i].ableColor = "border:1px solid #969696;border-right:0;"
            if (res[i].count > 1) {
              res[i].able1 = false;
              res[i].ableColor = '';
            }           
          }else{
            res[i].able1 = false;
            res[i].count -= 1;
            res[i].ableColor="";
          }
        }
    }
  },
  countAdd: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var user_id = e.currentTarget.dataset.user;
    var product_id = e.currentTarget.dataset.pid;
    var color_id = e.currentTarget.dataset.color;
    var count = e.currentTarget.dataset.count;
    var size_id = e.currentTarget.dataset.size;
    // data-pid='{{item.product_id}}' data-color='{{item.color_id}}' data-size='{{item.size_id}}' data-count='{{item.count}}' data-id="{{item.id}}" data-user='{{item.user_id}}
    wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/deleteCarts.do?id=" + id,
      success: function (res) {
        //删除购物车商品
      }
    })
    wx.request({  //添加购物车
      url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/addCart.do?user_id=" + user_id + "&product_id=" + product_id + "&color_id=" + color_id + "&size_id=" + size_id + "&count=" + (count+1),
      success: function (res) {
        //添加购物车
        console.log(res);
        getCart();
      }
    })
    function getCart(){
      wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
        //http://1977644bu3.iask.in/Miao
        url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getCarts.do?user_id=" + user_id,
        success: function (res) {
          //添加购物车
          res = res.data;
          console.log(res);
          var reslucy = res.data;
          var allprice = 0;
          for (var i = 0; i < res.length; i++) {
            res[i].select = "";
            res[i].able1 = true;
            res[i].ableColor = "border:1px solid #969696;border-right:0;";
            if (res[i].count > 1) {
              res[i].able1 = false;
              res[i].ableColor = '';
            }
            allprice += (res[i].price * res[i].count) * 100,
              res[i].cart_id = res[i].id
          }
          that.setData({
            cart: res,
            allprice: allprice / 100
          });
        }
      })
    };
    var res=that.data.cart;
    // 先删除当前商品再添加当前商品进入购物车并且数量增加
    for(var i=0;i<res.length;i++){
      if(res[i].id==id){
        res[i].count+=1;
        res[i].able1 = false;
        res[i].ableColor = "";
        wx.getStorage({
          key: 'user_id',
          success: function(result) {
          },
        })
        //删除当前购物车商品
      }else{
       
      }
    }
  },
  toPay:function(e){
    var that=this;
    // that.setData({
    //   dis: true
    // })
    var res=that.data.cart;
   
    var product_id="";
    for(var i=0;i<res.length;i++){
      if (res[i].select){
          product_id=res[i].product_id+",";
      }
    }
    if(that.data.state=="删除"){
      wx.getStorage({
        key: 'user_id',
        success: function (res) {
          var user_id = res.data
          var cart=that.data.cart;
          console.log(cart);
          for (var i = 0; i < cart.length; i++) {
              if (cart[i].select) {
                deleteSp(cart[i].id);
              }
          }
        },
      })
      function deleteSp(id) {
        //删除购物车中的商品 deleteCarts  id
        wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
        
          url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/deleteCarts.do?id=" + id,
          success: function (res) {
            //添加购物车
            var res = res.data;
            console.log(res);
            that.setData({
              dis:false
            })
            that.setData({
              cart: ''
            });
            //还要重新加载购物车重新渲染

            wx.getStorage({
              key: 'user_id',
              success: function (res) {
                var user_id = res.data
                searchSp(user_id);
              },
            })
            function searchSp(user_id) {
              //查找购物车中的商品
              var arr = []; var res = [];
              wx.request({  //2+"&color_id="+"5"+"&size_id="+"4",
                //http://1977644bu3.iask.in/Miao
                url: "https://maxbeijing.mxlgsl.cn/Miao/moneyProduct/getCarts.do?user_id=" + user_id,
                success: function (res) {
                  //添加购物车
                  res = res.data;
                  console.log(res);
                  var reslucy = res.data;
                  var allprice = 0;
                  for (var i = 0; i < res.length; i++) {
                    res[i].select = "";
                    res[i].able1 = true;
                    res[i].ableColor = "border:1px solid #969696;border-right:0;";
                    if (res[i].count > 1) {
                      res[i].able1 = false;
                      res[i].ableColor = '';
                    }
                    allprice += (res[i].price * res[i].count) * 100
                  }
                  that.setData({
                    cart: res,
                    allprice: allprice / 100
                  });
                }
              })


            }
          }
        })
      }
    } else if (that.data.state == '去支付') {
      //跳转到支付
      var that = this;
      var skulist = [];
      var productList = [];
      var cart = that.data.cart;
      var allprice =0;
      for (var i = 0; i < cart.length; i++) {
        if (res[i].select){
          productList.push({ cart_id: res[i].id, sku_id: res[i].sku_id, count: res[i].count, product_name: res[i].product_name, size_name: res[i].size_name, color_name: res[i].color_name, product_img_url_small: res[i].product_img_url_small, price: res[i].price });
          // skulist.push({ sku_id: res[i].sku_id, count: res[i].count })
          skulist.push({cart_id:res[i].id,sku_id:res[i].sku_id,count:res[i].count});
          allprice +=((res[i].price*100)*res[i].count)/100;
        }
      }
      var skujson = JSON.stringify(skulist);
      productList = JSON.stringify(productList);
      wx.navigateTo({
        url: '../../pages/querenOrder2/querenOrder2?skujson=' + skujson + "&productList=" + productList + "&allprice=" + allprice +'&heprice='+ allprice,
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
  update: function(e){
    var that=this;
    if (that.data.bianji=="编辑"){
      that.setData({
        bianji: "完成"
      });
      that.setData({
        state: "删除"
      })
    }else{
      that.setData({
        bianji: "编辑"
      });
      that.setData({
        state: "去支付"
      })
    }
  }
})