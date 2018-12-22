// pages/unlock/unlock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getWifiList: function() {
    // var wifiList = getApp().wifiList;
    // if (wifiList.length != 0) {
    //   getApp().wifiList = [];
    //   console.log(getApp().wifiList);
    // }
    wx.startWifi({
      success: (res) => {
        //console.log(res);
        wx.getWifiList({
          // success: (res) => {
          //   console.log(res);
          // }
        })
      }
    })

    wx.onGetWifiList((res) => {
      //console.log(res);
      var app = getApp();
      app.wifiList = res.wifiList;
      wx.switchTab({
        url: '../connectWifi/connectWifi',
        // success: () => {
        //   console.log("tab-success");
        // },
        // fail: () => {
        //   console.log("tab-fail");
        // }
      })
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})