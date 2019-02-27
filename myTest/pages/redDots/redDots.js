const app=getApp();


// pages/redDots/redDots.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_good_box: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.busPos = {};
    this.busPos['x'] = 180;//购物车的位置
    this.busPos['y'] = app.globalData.hh - 56;
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  middlejia: function (e) {
    var that = this;
    touchOnGoods(that, e);
  },
})


//调用的方法
function touchOnGoods(that, e) {
  that.finger = {}; var topPoint = {};
  that.finger['x'] = e.touches["0"].clientX;//点击的位置
  that.finger['y'] = e.touches["0"].clientY;
  console.log("finger", that.finger);
  console.log("busPos", that.busPos);

  // 计算手指触摸和购物车位置之前的差值
  if (that.finger['y'] < that.busPos['y']) {
    topPoint['y'] = that.finger['y'] - 150;
  } else {
    topPoint['y'] = that.busPos['y'] - 150;
  }
  topPoint['x'] = Math.abs(that.finger['x'] - that.busPos['x']) / 2;
  console.log("topPoint1", topPoint);
  if (that.finger['x'] > that.busPos['x']) {
    topPoint['x'] = (that.finger['x'] - that.busPos['x']) / 2 + that.busPos['x'];
  } else {//
    topPoint['x'] = (that.busPos['x'] - that.finger['x']) / 2 + that.finger['x'];
  }
  console.log("topPoint2", topPoint);
  that.linePos = app.bezier([that.busPos, topPoint, that.finger], 100);
  startAnimation(that, e);
}
function startAnimation(that, e) {
  var index = 0,
    bezier_points = that.linePos['bezier_points'];
  that.setData({
    hide_good_box: false,
    bus_x: that.finger['x'],
    bus_y: that.finger['y']
  })
  var len = bezier_points.length;
  index = len
  that.timer = setInterval(function () {
    for (let i = index - 1; i > -1; i--) {
      that.setData({
        bus_x: bezier_points[i]['x'],
        bus_y: bezier_points[i]['y']
      })
      console.log("bus_x", bezier_points[i]['x']);
      console.log("bus_y", bezier_points[i]['y']);
      if (i < 1) {
        clearInterval(that.timer);
        that.setData({
          hide_good_box: true
        })
      }
    }
  }, 25);
}